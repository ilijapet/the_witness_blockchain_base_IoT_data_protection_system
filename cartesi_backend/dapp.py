from os import environ
import hashlib
import datetime
import base64
import traceback
import logging
import requests
import json
from utils.protocol import WitnessProtocol
from data_processing import Database, engine


database = Database(engine)

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]

logger.info(f"HTTP rollup_server url is {rollup_server}")

def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    result = bytes.fromhex(hex[2:]).decode("utf-8")
    return json.loads(result)

def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()


def hash_public_key(public_key):
    hash_obj = hashlib.sha256()
    hash_obj.update(public_key)
    hash_hex = hash_obj.hexdigest()
    return hash_hex


def add_report(output=""):
    logger.info("Adding report " + output)
    report = {"payload": str2hex(output)}
    response = requests.post(rollup_server + "/report", json=report)
    logger.info(f"Received report status {response.status_code}")


def get_user_data():
    output = json.dumps({"user_daya": "this are user data "})
    add_report(output)
    return "accept"



def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    status = "accept"
    try:
        input_data = hex2str(data["payload"])
        logger.info(f"Received input: {input}")
        for key, value in input_data.items():
            data[key] = base64.b64decode(value)
        message = WitnessProtocol.decrypt_verifay(data["data"], data["signature"], data["public_key"])
        publick_key = data["public_key"].decode('utf-8').replace('\n', '\\n').encode('utf-8')
        digest = hash_public_key(publick_key)
        str_data = message.decode('utf-8')
        data_dict = json.loads(str_data)
        database.update_data(digest, data_dict)

        # Evaluates expression
        logger.info(f"HTTP rollup_server url is {rollup_server}")

        # Emits notice with result of calculation
        logger.info(f"Adding notice with payload: '{input}'")
        response = requests.post(rollup_server + "/notice", json={"payload": str2hex(str(input))})
        logger.info(f"Received notice status {response.status_code} body {response.content}")

    except Exception as e:
        status = "reject"
        msg = f"Error processing data {data}\n{traceback.format_exc()}"
        logger.error(msg)
        response = requests.post(rollup_server + "/report", json={"payload": str2hex(msg)})
        logger.info(f"Received report status {response.status_code} body {response.content}")

    return status

def handle_inspect(data):
    try:
        payload = json.loads(hex2str(data["payload"]))
    except:
        return "reject"
    method = payload.get("method")
    logger.info(f"Received inspect request data {method}")
    handler = inspect_method_handlers.get(method)
    if not handler:
        return "reject"
    
    return handler()

inspect_method_handlers = {
    "get_user_data": get_user_data
}

finish = {"status": "accept"}

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}


while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    logger.info("Time:" + str(datetime.datetime.now()))
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        print("unutra si")
        rollup_request = response.json()
        data = rollup_request["data"]

        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])