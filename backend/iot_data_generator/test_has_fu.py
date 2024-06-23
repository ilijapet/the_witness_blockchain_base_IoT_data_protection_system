

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv

    load_dotenv()
    import hashlib

    def hash_public_key(public_key):
        # Create a SHA-256 hash object
        hash_obj = hashlib.sha256()
        
        # Update the hash object with the public key bytes
        hash_obj.update(public_key)
        
        # Generate the hash digest as a hexadecimal string
        hash_hex = hash_obj.hexdigest()
        
        return hash_hex

    
    def get_env_var(index):
        private_key = os.environ.get(f"PRIVATE_KEY_{index}").encode()
        public_key = os.environ.get(f"PUBLIC_KEY_{index}").encode()
        return private_key, public_key
    
    private_key, public_key = get_env_var(1)
    digest = hash_public_key(public_key)
    db = Database(engine)
    # db.create_table()
    db.insert_data({
        "uuid": digest,
        "brake_status": True,
        "tires_status": False,
        "engine_status": False,
        "distance": 100
    })
    # db.update_data("0x123456", brake_status=False, tires_status=True, distance=200)
    result = db.get_data(digest)
    print(result.__dict__)


