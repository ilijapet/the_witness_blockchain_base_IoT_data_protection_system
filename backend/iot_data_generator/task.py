import json
import base64
import requests
from dotenv import load_dotenv
import datetime
from utils.protocol import WitnessProtocol
import random
from dotenv import load_dotenv
from utils.protocol import WitnessProtocol
from utils.env_var_managment import GetVar

load_dotenv()


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
        private_key_iot, public_key_iot = GetVar.get_env_var(env_index)
        private_key_cartesi, public_key_cartesi = GetVar.get_env_var("CARTESI")
        data = IotDataGenerator.random_data_generator()
        received_encrypted_message, received_signature_a, public_key_iot = WitnessProtocol.encrypt_sign(data, public_key_cartesi, private_key_iot, public_key_iot)
        body = {
            "data": received_encrypted_message,
            "signature": received_signature_a,
            "public_key": public_key_iot,
        } 
        for key, value in body.items():
            body[key] = base64.b64encode(value).decode()
        response = requests.post("http://localhost:8000/api/v1/bridge", json=body)
        return body
