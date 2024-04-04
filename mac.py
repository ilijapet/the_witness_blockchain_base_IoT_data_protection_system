import os
import hmac
import hashlib
from Crypto.Hash import keccak
import time
from datetime import datetime

#TODO: add lgger

#  To be used by the sender
def generate_hmac(key, message, device_id, timestamp=None):
    """
    Generates HMAC for the given message using the provided key.
    """
    # Convert key and message to bytes if they are strings
    if isinstance(key, str):
        key = key.encode('utf-8')
    if isinstance(message, str):
        message = message.encode('utf-8')
    if isinstance(device_id, str):
        device_id = device_id.encode('utf-8')
    if isinstance(timestamp, str):
        timestamp = timestamp.encode('utf-8')

    # Add timestamp to the message
    if not timestamp: 
        timestamp = str(int(time.time())).encode('utf-8')
    message_with_timestamp = message + timestamp + device_id
    
    # Generate HMAC using SHA-256 hash function
    hmac_digest = hmac.new(key, message_with_timestamp, hashlib.sha256).digest()
    
    return hmac_digest, message_with_timestamp


#  To be used by the receiver
def verify_hmac(key, message_with_timestamp, hmac_digest):
    """
    Verifies the authenticity of the message using the provided HMAC digest and key.
    """
    # Extract message and timestamp from message_with_timestamp
    message = message_with_timestamp[:-12]  # Assuming last 10 bytes represent timestamp
    timestamp = message_with_timestamp[-12:-2].decode('utf-8')
    device_id = message_with_timestamp[-2:].decode('utf-8')

    # Generate HMAC for the received message
    generated_hmac, _ = generate_hmac(key, message, device_id, timestamp)
    print("Received HMAC:", hmac_digest.hex())
    print("Generated HMAC:", generated_hmac.hex())
    
    # Compare the generated HMAC with the received HMAC digest
    return hmac.compare_digest(generated_hmac, hmac_digest), message, timestamp, device_id

# Utility functions
def timestamp_to_date(timestamp):
    # Convert timestamp to datetime object
    dt_object = datetime.fromtimestamp(int(timestamp))
    # Format datetime object as string
    return dt_object.strftime('%Y-%m-%d %H:%M:%S')

def keccak256(data):
    keccak_hash = keccak.new(digest_bits=256)
    keccak_hash.update(data)
    return keccak_hash.digest()


if __name__ == "__main__":

    key = os.urandom(32)  # Generate a random key of 32 bytes (256 bits)
    print(f"Key: {key.hex()}")

    # Example usage
    plaintext = b'probaj nesto pristojno'
    hash_output = keccak256(plaintext)
    print(f"Hash output: {hash_output.hex()}")
    device_id = "10"
    hmac_digest, message_with_timestamp = generate_hmac(key, hash_output, device_id)
    print("Generated HMAC:", hmac_digest.hex())

    # Verify the authenticity of the message: key reciver have all the rest is sent by sender
    is_valid, message, timestamp, device_id = verify_hmac(key, message_with_timestamp, hmac_digest)
    print("Message is valid:", is_valid)
    print("Message hash output:", message.hex())
    print("Timestamp:", timestamp)
    print("Date:", timestamp_to_date(timestamp))





