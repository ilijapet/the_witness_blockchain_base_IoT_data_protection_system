from os import environ
import datetime
import base64
import traceback
import logging
import requests
import json
from utils.protocol import WitnessProtocol

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

def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    status = "accept"
    try:
        input_data = hex2str(data["payload"])
        logger.info(f"Received input: {input}")
        for key, value in input_data.items():
            data[key] = base64.b64decode(value)
        message = WitnessProtocol.decrypt_verifay(data["data"], data["signature"], data["public_key"])
        print(message)
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
    logger.info(f"Received inspect request data {data}")
    logger.info("Adding report")
    response = requests.post(rollup_server + "/report", json={"payload": data["payload"]})
    logger.info(f"Received report status {response.status_code}")
    return "accept"

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    logger.info("Time:" + str(datetime.datetime.now()))
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]

        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])