import json
import os
from web3 import Web3
from dotenv import load_dotenv
from eth_account.signers.local import LocalAccount
import logging
import os
from typing import Dict

load_dotenv()



class BaseContract:

    def __init__(self,):
        self.abi_path: str = os.environ.get("ABI_PATH")
        self.inputbox_address: "address" = Web3.to_checksum_address(os.environ.get("INPUTBOX_ADDRESS"))
        self.dapp_address: "address" = Web3.to_checksum_address(os.environ.get("DAPP_ADDRESS"))
        self.default_url: str = os.environ.get("DEFAULT_URL")
        try:
            self.w3 = Web3(Web3.HTTPProvider(self.default_url))
            self.account = self.w3.eth.account.from_key(os.environ.get("PRIVATE_KEY_FOUNDRY"))
        except Exception as e:
            logging.error(f"Error initializing BaseContract: {e}")


class ContractInstatiator(BaseContract):
    
    def __init__(self):
        super().__init__()
        self.contract: "Contract" = self.contract_instance(self.abi_path)

    # Return contract instance
    def contract_instance(self, abi_path: str) -> "Contract":
        try:
            abi = ContractUtilities.load_abi(abi_path)
            contract = self.w3.eth.contract(
                address=self.inputbox_address, abi=abi
            ) # type: ignore
            return contract
        except Exception as e:
            logging.error(f"Error initializing contract_instance: {e}")
            raise e


class ContractUtilities():        

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
        

    def sendInput(self, value: dict) -> dict:
        hex_s: str = ContractUtilities.generate_hex(value)
        tx_hash: Dict = self.contract.functions.addInput(self.dapp_address, hex_s).transact({"from": self.account.address})
        return tx_hash




if __name__ == "__main__":
    value = {"proba": "jeda dva"}
    contract = SCInterface()
    result = contract.sendInput(value)
    print(result)






