from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.Cipher import PKCS1_OAEP

# Generate RSA key pair
def generate_key_pair():
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

# Sign a message with private key
def sign_message(message, private_key):
    key = RSA.import_key(private_key)
    h = SHA256.new(message)
    signer = PKCS1_v1_5.new(key)
    signature = signer.sign(h)
    return signature

# Encrypt a message with public key
def encrypt_message(message, public_key):
    key = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(key)
    encrypted_message = cipher.encrypt(message)
    return encrypted_message

# Decrypt a message with private key
def decrypt_message(encrypted_message, private_key):
    key = RSA.import_key(private_key)
    cipher = PKCS1_OAEP.new(key)
    decrypted_message = cipher.decrypt(encrypted_message)
    return decrypted_message

# Verify the digital signature of a message
def verify_signature(message, signature, public_key):
    key = RSA.import_key(public_key)
    h = SHA256.new(message)
    verifier = PKCS1_v1_5.new(key)
    if verifier.verify(h, signature):
        return True
    else:
        return False

# Main function to simulate the protocol
def main():
    # Generate key pairs for nodes A, B, and C
    private_key_a, public_key_a = generate_key_pair()
    private_key_b, public_key_b = generate_key_pair()
    private_key_c, public_key_c = generate_key_pair()
    private_key_fake, public_key_fake = generate_key_pair()

    # Simulate message transmission from A to C via B
    message = b"This is a secret message from Node A to Node C via Node B"

    # Node A signs the message
    signature_a = sign_message(message, private_key_a)
    # signature_a = sign_message(message, private_key_fake)

    # Node A encrypts the message with Node C's public key
    encrypted_message = encrypt_message(message, public_key_c)

    # Node A sends the encrypted message and the digital signature to Node B
    # In a real scenario, this step would involve network communication
    received_encrypted_message = encrypted_message
    received_signature_a = signature_a


 
    # Node B signs the received encrypted message
    signature_b = sign_message(received_encrypted_message, private_key_b)

        # Node B forwards the encrypted message and its signature to Node C
    # In a real scenario, this step would involve network communication
    received_encrypted_message_c = received_encrypted_message
    received_signature_b = signature_b

    # Node C verifies the digital signature using Node B's public key
    is_signature_valid_b = verify_signature(received_encrypted_message_c, received_signature_b, public_key_b)
    if is_signature_valid_b:
        # Node C decrypts the message using its private key
        decrypted_message = decrypt_message(received_encrypted_message_c, private_key_c)

        # Node C verifies the digital signature using Node A's public key
        is_signature_valid_a = verify_signature(decrypted_message, received_signature_a, public_key_a)
        if is_signature_valid_a:
            print("Message from Node A to Node C via Node B:", decrypted_message.decode())
            print("Signature verification (Node B): Valid")
            print("Signature verification (Node A): Valid")
        else:
            print("Signature verification (Node A): Invalid")
    else:
        print("Signature verification (Node B): Invalid")

if __name__ == "__main__":
    main()



    # TODO: add Node B verifies the digital signature using Node A's public key

# Generate Public-Private Key Pairs:
# Generate public-private key pairs for Node A, Node B, and Node C.

# Message Transmission from A to C via B:
# Node A:
# Generate a message.
# Sign the message using its private key.
# Encrypt the signed message using Node C's public key.
# Send the encrypted message and the digital signature to Node B.

# Node B:
# Receive the encrypted message and the digital signature from Node A.
# Verify the digital signature using Node A's public key.
# Forward the encrypted message to Node C.

# Node C:
# Receive the encrypted message from Node B.
# Decrypt the message using its private key.
# Verify the digital signature using Node A's public key.
# If the signature is valid, process the message.