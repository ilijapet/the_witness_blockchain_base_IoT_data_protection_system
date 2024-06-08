import json
import os
from dotenv import load_dotenv
import datetime
from utils.protocol import WitnessProtocol
import random
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.Cipher import PKCS1_OAEP
from dotenv import load_dotenv
import logging

load_dotenv()



class GetVar:
    @staticmethod
    def get_env_var(index):
        private_key = os.environ.get(f"PRIVATE_KEY_{index}").encode()
        public_key = os.environ.get(f"PUBLIC_KEY_{index}").encode()
        return private_key, public_key
    
private_key_cartesi, public_key_cartesi = GetVar.get_env_var("CARTESI")


class IotDataGenerator:
    @staticmethod
    def generate_random_iot_data():
        data = {
            "type": "statistic",
            "temperature": random.randint(20, 50),
            "pressure": random.randint(20, 50),
            "light": random.randint(20, 50),
            "engine_temp": random.randint(20, 50),
            "speed": random.randint(20, 50),
            "fuel": random.randint(20, 50),
            "machine_brake": random.randint(0, 1),
            "distance": random.randint(20, 50),
            "created_at": datetime.datetime.now().isoformat(),
        }
        return json.dumps(data)

    @staticmethod
    def generate_random_odometer_data():
        # generate random data
        data = {
            "type": "odometer",
            "distance": random.randint(20, 50),
            "created_at": datetime.datetime.now().isoformat(),
        }
        return json.dumps(data)
    

    @staticmethod
    def random_data_generator():
        return {1: IotDataGenerator.generate_random_iot_data(), 2: IotDataGenerator.generate_random_odometer_data()}.get(random.randint(1, 2))

    @classmethod
    def iot_data_generator(cls, job=None):
        env_index = random.randint(1, 3)
        private_key_iot, public_key_iot = GetVar.get_env_var(3)
        private_key_cartesi, public_key_cartesi = GetVar.get_env_var("CARTESI")
        data = IotDataGenerator.random_data_generator()
        received_encrypted_message, received_signature_a, public_key_iot = WitnessProtocol.encrypt_sign(data, public_key_cartesi, private_key_iot, public_key_iot)
        body = {
            "data": received_encrypted_message,
            "signature": received_signature_a,
            "public_key": public_key_iot,
        }  
        return body


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
        is_signature_valid_a = WitnessProtocol.verify_signature(received_encrypted_message, received_signature_a, public_key_iot)
        if is_signature_valid_a:
            decrypted_message = WitnessProtocol.decrypt_message(received_encrypted_message, private_key_cartesi)
            print("Message from IoT device to Cartrsi backend via Django server:", decrypted_message.decode())
            print("Signature verification from node A): Valid")        
            return decrypted_message
        else:
            print("Signature verification (Node A): Invalid")

if __name__ == "__main__":
    body = IotDataGenerator.iot_data_generator()
    print("Task executed successfully.")
    result = WitnessProtocol.decrypt_verifay(body["data"], body["signature"], body["public_key"])


