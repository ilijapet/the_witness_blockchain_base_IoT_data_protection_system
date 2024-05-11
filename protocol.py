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
    # Generate key pairs for nodes IoT device, Django, and Cartesi backend
    private_key_iot, public_key_iot = generate_key_pair()
    private_key_django, public_key_django = generate_key_pair()
    private_key_cartesi, public_key_cartesi = generate_key_pair()
    private_key_fake, public_key_fake = generate_key_pair()

    # Simulate message transmission from IoT to Cartesi via Django
    message = b"Odometar: 123456km"

    # IoT device encrypts the message with  Cartesi's public key (to preserve confidentiality and 
    # integrity will passing over Django server)
    encrypted_message = encrypt_message(message, public_key_cartesi)

    # IoT device (in later more realistic phase mobile phone connected to IoD device or service software when user goes 
    # for regular car check up) signs the encrypted message
    signature_a = sign_message(encrypted_message, private_key_iot)

    # IoT device sends the encrypted message and the digital signature to Django backend server
    received_encrypted_message = encrypted_message
    received_signature_a = signature_a

    # Django server verifies the digital signature using IoT public key
    is_signature_valid_a = verify_signature(received_encrypted_message, received_signature_a, public_key_iot)

    # If everything goes well
    if is_signature_valid_a:
        # Django signs the received encrypted message and submit tx (pay tx fee) to Cartesi backend
        signature_b = sign_message(received_encrypted_message, private_key_django)

        # Django forwards the encrypted message via tx submitted to blockchain and its signature to Cartesi backend
        received_signature_b = signature_b

        # Cartesi backend verifies the digital signature using Django abckend public key
        is_signature_valid_b = verify_signature(received_encrypted_message, received_signature_b, public_key_django)
        # If message is comming from Django backend
        if is_signature_valid_b:
            # Cartesi decrypts the message using its own private key
            # TODO: here on this point we also need to verifay that encrypted message coming from IoT and that is not tampered with
            # currently this is not implemented
            decrypted_message = decrypt_message(received_encrypted_message, private_key_cartesi)
            print("Message from Node A to Node C via Node B:", decrypted_message.decode())
            print("Signature verification (Node A): Valid")
            print("Signature verification (Node B): Valid")
        else:
            print("Signature verification (Node B): Invalid")
    else:
        print("Signature verification (Node A): Invalid")

if __name__ == "__main__":
    main()


 # test   