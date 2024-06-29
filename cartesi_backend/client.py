import requests
import json

# Assuming hex2str is a function you have that converts hex to string
def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    result = bytes.fromhex(hex[2:]).decode("utf-8")
    return json.loads(result)


DEFAULT_URL = "http://localhost:5005/inspect"


async def inspect(payload):
    import httpx
    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.get(f"{DEFAULT_URL}/{json.dumps(payload)}")
        if response.status_code == 200:
            return response.json()['reports']
        else:
            print(response.text)
            return None


async def main():
    data = json.dumps({"method": "get_user_data"})
    results = await inspect(data)
    results = hex2str(results[0]['payload'])
    if results:
        print(results)

# Example usage
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())