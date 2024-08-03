import json
import logging
import os
from typing import Dict

from dotenv import load_dotenv
from eth_account.signers.local import LocalAccount
from web3 import Web3

load_dotenv()


class BaseContract:

    def __init__(
        self,
    ):
        self.abi_path: str = os.environ.get("ABI_PATH")
        self.inputbox_address: "address" = Web3.to_checksum_address(  # noqa: F821
            os.environ.get("INPUTBOX_ADDRESS")
        )
        self.dapp_address: "address" = Web3.to_checksum_address(  # noqa: F821
            os.environ.get("DAPP_ADDRESS")
        )  # noqa: 821
        self.default_url: str = os.environ.get("DEFAULT_URL")
        self.private_keys = os.environ.get("PRIVATE_KEY_FOUNDRY")
        try:
            self.w3 = Web3(Web3.HTTPProvider(self.default_url))
            self.account = self.w3.eth.account.from_key(os.environ.get("PRIVATE_KEY_FOUNDRY"))
        except Exception as e:
            logging.error(f"Error initializing BaseContract: {e}")


class ContractInstatiator(BaseContract):

    def __init__(self):
        super().__init__()
        self.contract: "Contract" = self.contract_instance(
            self.abi_path, self.inputbox_address
        )  # noqa: 821

    # Return contract instance
    def contract_instance(self, abi_path: str, address: str) -> "Contract":  # noqa: 821
        try:
            abi = ContractUtilities.load_abi(abi_path)
            contract = self.w3.eth.contract(address, abi=abi)  # type: ignore
            return contract
        except Exception as e:
            logging.error(f"Error initializing contract_instance: {e}")
            raise e


class ContractUtilities:

    @staticmethod
    def load_abi(abi_path: str) -> Dict | None:
        try:
            cwd = os.getcwd()
            abi_path = os.path.join(cwd, abi_path)
            if not os.path.exists(abi_path):
                components = abi_path.split(os.sep)
                index = components.index("device_data_integrity_system")
                components.insert(index + 1, "backend")
                abi_path = os.sep + os.path.join(*components)
            with open(abi_path) as f:
                abi = json.load(f)
                abi = abi["abi"]
                assert abi, f"ABI file {abi_path} is empty"
                return abi
        except Exception as e:
            logging.error(f"Error loading ABI: {e}")
            return None

    @staticmethod
    def generate_hex(value: dict) -> str:
        inputBytes = json.dumps(value)
        hex_s = "0x" + inputBytes.encode("utf-8").hex()
        return hex_s


class SCInterface(ContractUtilities, ContractInstatiator):

    account: LocalAccount

    # General setup
    def __init__(self):
        super().__init__()

    def sendInput(self, value: dict):
        hex_s: str = ContractUtilities.generate_hex(value)
        nonce = self.w3.eth.get_transaction_count(self.account.address)
        stored_transaction = self.contract.functions.addInput(
            self.dapp_address, hex_s
        ).build_transaction({"from": self.account.address, "nonce": nonce})
        signed_tx = self.w3.eth.account.sign_transaction(
            stored_transaction, private_key=self.private_keys
        )
        transaction_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        # tx_receipt = self.w3.eth.wait_for_transaction_receipt(transaction_hash)
        # print(tx_receipt)
        return transaction_hash


if __name__ == "__main__":
    sc = SCInterface()
    # result = sc.w3.eth.get_code(sc.dapp_address)
    # if result.hex() == "0x":
    #     print("Contract not deployed")
    # else:
    #     print("Contract deployed")
    #     print(result)

    data = {
        "data": "HoqM4qDK98cl4UeFtnV/4deQHAZgGfQSV3q6LrkE72JUIngubY2NmFFhRzgqFMNQ2wqSeBve2wt0M51aj9mVn2lVKzy/BhyXh4ShQpJHGPGOkxlYXsHiYkvjWCyrV/1PYfPv7sEWGji2Oa+Fvz9LSwKz31K9vEpZHQXKbYZYPJw8bsSj0vwrxUQhHzk+JpDWWYnnbFQHI9UChZTDJeRTqxhgdZCDRjNZaCTafF8ZAdXDwAwpLyLTX/+ATFZbElJ84HxEOLGTS9jk7Hmk50j6ppCF+OL/MLjIWZOAu79KvHvyPKBK7nowwVDXJEB64nEeRBzxSiVB4YC6fvVnRkM2Tg==",
        "signature": "Qo6/FBviMEhvK6JLcxukOiOoLYdOXbkFuI9KJrEbMxOmgmDXLCm05r/tXqp6KsJUy9HdGa4VObM1dCTNNDR5dh9ZDHzRnBqWQ6e1XBnehFoC45ebZS4brbkPzUChWXRB3v9PjUQrlIBCbOHhZrQ8ULRPCPLfp5tzH4MhLlmQiZL/aOdd9oiVdtk1XoEw1xMLuHWE1hIM3Dkh4vTz16X5ftqDU22uwgwraOmVsZZG1jU4ZZu6A8SqPxtq80t4LkFsokPN0IcRDI76OCiqetnShl6ssIqJSmhuWiUj2BX0wW7bymRht9F6zK4yDOaon3e5s61Zbym2XijZXwLg7TUizw==",
        "public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cbk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelM3UnBVV2srclJFdVVqVTZsRkxcbmdlcXNRbW55ZGxCRHNVaE9WTURXUjlzeHR5amNrUmprM2x2cW5LM0lNRVZKSVRzNHhaTFhrMDRtbk9BSHhnSTBcbld5ekJzYVlWN09HMGlWVTZQajRHTVZzTGlBbzl1cXpVTkp1VVV4NTFCVmYwbFhlekF1Y00rcDVrZm42R2V3dEdcbnlOSW1mV0QveFdKcGFkTmVNU001c291TlpRVUY2bmEwNCtObExBbnl1SGhMbGZ2NXBkS1M4emc1RnZZVXp1YlhcbkdhS1JWTk1jWkd5bDg1SXJuSWVOcjNHYmw1YmlBVGVzUTErOVUxMi8yeldjN2F1UWkzU3RyN3JvOWhzT2s0ZUlcbjNPWGVYZlZtUG1sL0hwdXBGc1hIWjRSQTNuZTRqSG5LeG1xaklPNFM1R0p4a2lxNUR6KzNVcG94d1dHeHNzcHVcbkl3SURBUUFCXG4tLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0=",
    }
    hex_s: str = ContractUtilities.generate_hex(data)

    nonce = sc.w3.eth.get_transaction_count(sc.account.address)
    private_keys = os.environ.get("PRIVATE_KEY_FOUNDRY")
    stored_transaction = sc.contract.functions.addInput(sc.dapp_address, hex_s).build_transaction(
        {"from": sc.account.address, "nonce": nonce}
    )

    #  Step two sign transaction
    signed_tx = sc.w3.eth.account.sign_transaction(stored_transaction, private_key=private_keys)

    transaction_hash = sc.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = sc.w3.eth.wait_for_transaction_receipt(transaction_hash)

    print(tx_receipt)
