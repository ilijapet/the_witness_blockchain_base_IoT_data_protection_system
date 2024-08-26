import base64
import datetime
import hashlib
import json
import logging
import traceback
from os import environ

import requests
from utils.data_processing import Database, engine
from utils.protocol import WitnessProtocol

database = Database(engine)

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]

logger.info(f"HTTP rollup_server url is {rollup_server}")
logger.info("We are in...")


def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    logger.info("Hex")
    result = bytes.fromhex(hex[2:]).decode("utf-8")
    return json.loads(result)


def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()


def hash_public_key(public_key):
    logger.info(f"Adding report {public_key}")
    hash_obj = hashlib.sha256()
    hash_obj.update(public_key)
    hash_hex = hash_obj.hexdigest()
    return hash_hex


def add_report(output=""):
    logger.info("Adding report " + output)
    report = {"payload": str2hex(output)}
    response = requests.post(rollup_server + "/report", json=report)
    logger.info(f"Received report status {response.status_code}")


def get_user_data(data):
    _, public_key = Database.get_env_var(1)
    digest = hash_public_key(public_key)
    logger.info(f"Digest {public_key}")
    logger.info(f"Digest {digest}")
    user_data = database.get_data(digest)
    if not user_data:
        return "reject"
    add_report(user_data)
    return "accept"


# TODO: take out update_data from handle_advance and put it in a separate function
def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    status = "accept"
    try:
        input_data = hex2str(data["payload"])
        logger.info(f"Received input: {input_data}")
        for key, value in input_data.items():
            data[key] = base64.b64decode(value)
        result = WitnessProtocol.verify_signature(
            data["data"], data["signature"], data["public_key"]
        )

        if result:
            logger.info("Result is true")
            publick_key = data["public_key"].decode("utf-8").replace("\n", "\\n").encode("utf-8")
            logger.info("Public key")
            digest = hash_public_key(publick_key)
            logger.info(f"Digest {digest}")
            data_dict = json.loads(data["data"])
            logger.info(f"Data dict {data_dict}")
            database.update_data(digest, data_dict)

        logger.info(f"HTTP rollup_server url is {rollup_server}")

        logger.info(f"Adding notice with payload: '{input_data}'")
        response = requests.post(rollup_server + "/notice", json={"payload": str2hex(str(input))})
        logger.info(f"Received notice status {response.status_code} body {response.content}")

    except Exception as e:
        status = "reject"
        msg = f"Error {e} processing data  {data}\n{traceback.format_exc()}"
        logger.error(msg)
        response = requests.post(rollup_server + "/report", json={"payload": str2hex(msg)})
        logger.info(f"Received report status {response.status_code} body {response.content}")

    return status


def handle_inspect(data):
    try:
        payload = hex2str(data["payload"])
    except Exception as e:
        logger.error(f"Error {e} decoding payload {data['payload']}")
        return "reject"
    method = payload.get("method")
    logger.info(f"Received inspect request data {method}")
    handler = inspect_method_handlers.get(method)
    if not handler:
        return "reject"
    return handler(method)


inspect_method_handlers = {"get_user_data": get_user_data}

finish = {"status": "accept"}

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}


while True:
    logger.info("Sending finish")
    logger.info("Sending Ilija")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    logger.info("Time:" + str(datetime.datetime.now()))
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        logger.info(f"Request type {rollup_request['request_type']}")
        data = rollup_request["data"]
        logger.info(f"Data {data}")

        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])
