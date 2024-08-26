import logging

from Crypto.Cipher import PKCS1_OAEP
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from dotenv import load_dotenv

from .env_var_managment import GetVar

# from env_var_managment import GetVar


load_dotenv()


private_key_cartesi, public_key_cartesi = GetVar.get_env_var("CARTESI")


class WitnessProtocol:
    # Generate RSA key pair
    @staticmethod
    def generate_key_pair():
        key = RSA.generate(2048)
        private_key = key.export_key()
        public_key = key.publickey().export_key()
        return private_key, public_key

    # Sign a message with private key
    @staticmethod
    def sign_message(message, private_key):
        try:
            private_key = private_key.replace(b"\\n", b"\n")
            key = RSA.import_key(private_key)
            h = SHA256.new(message)
            signer = PKCS1_v1_5.new(key)
            signature = signer.sign(h)
            return signature
        except Exception as e:
            logging.info(f"Signing Message Error:{e}")

    # Encrypt a message with public key
    @staticmethod
    def encrypt_message(message, public_key):
        try:
            public_key = public_key.decode("utf-8").replace("\\n", "\n")
            key = RSA.import_key(public_key.encode())
            cipher = PKCS1_OAEP.new(key)
            message_bytes = message.encode("utf-8")
            encrypted_message = cipher.encrypt(message_bytes)
            return encrypted_message
        except Exception as e:
            logging.info(f"Encrypting Message Error:{e}")

    # Decrypt a message with private key
    @staticmethod
    def decrypt_message(encrypted_message, private_key):
        private_key = private_key.replace(b"\\n", b"\n")
        key = RSA.import_key(private_key)
        cipher = PKCS1_OAEP.new(key)
        decrypted_message = cipher.decrypt(encrypted_message)
        return decrypted_message

    @staticmethod
    def verify_signature(message, signature, public_key):
        public_key = public_key.decode("utf-8").replace("\\n", "\n").encode("utf-8")
        key = RSA.import_key(public_key)
        h = SHA256.new(message)
        verifier = PKCS1_v1_5.new(key)
        if verifier.verify(h, signature):
            return True
        else:
            return False

    # Main function to simulate the protocol
    @staticmethod
    def encrypt_sign(message, public_key_cartesi, private_key_iot, public_key_iot):
        encrypted_message = WitnessProtocol.encrypt_message(message, public_key_cartesi)

        signature_a = WitnessProtocol.sign_message(encrypted_message, private_key_iot)

        received_encrypted_message = encrypted_message
        received_signature_a = signature_a
        return received_encrypted_message, received_signature_a, public_key_iot

    @staticmethod
    def decrypt_verifay(received_encrypted_message, received_signature_a, public_key_iot):
        is_signature_valid_a = WitnessProtocol.verify_signature(
            received_encrypted_message, received_signature_a, public_key_iot
        )
        if is_signature_valid_a:
            decrypted_message = WitnessProtocol.decrypt_message(
                received_encrypted_message, private_key_cartesi
            )
            print(
                "Message from IoT device to Cartrsi backend via Django server:",
                decrypted_message.decode(),
            )
            print("Signature verification from node A): Valid")
            return decrypted_message
        else:
            print("Signature verification (Node A): Invalid")


if __name__ == "__main__":
    import base64
    import datetime
    import hashlib
    import json
    import logging
    import traceback
    from os import environ

    import requests

    logging.basicConfig(level="INFO")
    logger = logging.getLogger(__name__)

    def hash_public_key(public_key):
        logger.info(f"Adding report {public_key}")
        hash_obj = hashlib.sha256()
        hash_obj.update(public_key)
        hash_hex = hash_obj.hexdigest()
        return hash_hex

    def handle_advance(data):
        logger.info(f"Received advance request data {data}")

        status = "accept"
        try:
            result = WitnessProtocol.verify_signature(
                data["data"].encode(), data["signature"], data["public_key"]
            )
            print(result)

            if result:
                digest = hash_public_key(data["public_key"])
                data_dict = json.loads(data["data"])
                print(data_dict)

            # Emits notice with result of calculation
            logger.info(f"Adding notice with payload: '{input}'")

        except Exception as e:
            status = "reject"
            msg = f"Error {e} processing data  {data}\n{traceback.format_exc()}"
            logger.error(msg)
            logger.info(f"Received report status {response.status_code} body {response.content}")

        return status

    private_key_cartesi, public_key_cartesi = GetVar.get_env_var("CARTESI")
    data = '{"type": "statistic", "distance": 8594, "break_status": 0, "tires_status": 0, "engine_status": 1, "created_at": "2024-08-24T15:42:56.212955"}'
    digital_signature = WitnessProtocol.sign_message(data.encode(), private_key_cartesi)
    value = {
        "data": data,
        "signature": digital_signature,
        "public_key": public_key_cartesi,
    }

    a = handle_advance(value)
