import requests
import json

def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    result = bytes.fromhex(hex[2:]).decode("utf-8")
    return json.loads(result)


DEFAULT_URL = "http://localhost:5005/inspect"

def inspect(payload):
    response = requests.get(f"{DEFAULT_URL}/{json.dumps(payload)}")
    if response.status_code == 200:
        return response.json()['reports']
    else:
        print(response.text)
        return None


# Example usage
if __name__ == "__main__":
    data = json.dumps({"method": "get_user_data"})
    result = inspect(data)
    result = hex2str(result[0]['payload'])
    if result:
        print(result)