import json
import os
from web3 import Web3
from dotenv import load_dotenv
from eth_account.signers.local import LocalAccount
from web3.middleware import construct_sign_and_send_raw_middleware

load_dotenv()

DEFAULT_URL = "http://localhost:8545"
# DEFAULT_URL = "http://127.0.0.1:5004"
INPUTBOX_ADDRESS = Web3.to_checksum_address("0x59b22D57D4f067708AB0c00552767405926dc768")



class BaseContract:

    def __init__(self, contract_address: str, provider: str, abi_path: str):
        self.contract_address = Web3.to_checksum_address(contract_address)
        self.w3 = Web3(Web3.HTTPProvider(provider))
        self.account =  self.w3.eth.account.from_key(os.environ.get("PRIVATE_KEY_FOUNDRY"))
        # self.w3.middleware_onion.add(construct_sign_and_send_raw_middleware(self.account))
        self.contract = self.contract_instance(abi_path)

class ContractInstatiator(BaseContract):
    
    # Return contract instance
    def contract_instance(self, abi_path: str):
        abi = self.load_abi(abi_path)
        contract = self.w3.eth.contract(
            address=self.contract_address, abi=abi
        )
        return contract


class ContractUtilities(BaseContract):        

    # inherit from utilitites
    def load_abi(self, abi_path: str) -> dict:
        try:
            with open(abi_path) as f:
                abi = json.load(f)
                abi = abi["abi"]
                return abi
        except Exception as e:
            #  TODO: Add logger
            # TODO: do more specific error handling
            return e



class InboxContract(ContractInstatiator, ContractUtilities):

    account: LocalAccount 

    # General setup
    def __init__(self, contract_address: str, provider: str, abi_path: str):
        super().__init__(contract_address, provider, abi_path)
        

    def getNumberOfInputs(self) -> dict:
        DAAP_ADDRESS = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
        DAAP_ADDRESS = Web3.to_checksum_address(DAAP_ADDRESS)
        value = {"proba": "ilija care mogud a ti puse kare"}
        inputBytes = json.dumps(value)
        hex_s = "0x" + inputBytes.encode("utf-8").hex()

        tx_hash = self.contract.functions.addInput(DAAP_ADDRESS, hex_s).transact({"from": self.account.address})
        # tx_hash = self.contract.functions.getNumberOfInputs(DAAP_ADDRESS).call()
        return tx_hash

    # def get_donator_token_balance(self) -> int:
    #     result = self.contract.functions.donatorTokenBalance().call()
    #     return result



if __name__ == "__main__":
    contract = InboxContract(INPUTBOX_ADDRESS, DEFAULT_URL, "./cartesi_backend/abi/InputBox.json")
    result = contract.getNumberOfInputs()
    print(result)



# Generate hex
# import json

# # Your dictionary
# d = {"key": "value"}

# # Convert the dictionary to a string
# s = json.dumps(d)

# # Convert the string to hexadecimal
# hex_s = "0x" + s.encode("utf-8").hex()