from dotenv import load_dotenv
from sqlalchemy.sql import func
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager

load_dotenv()

# TODO: do this only ones when the app is started
engine = create_engine('sqlite:////home/ilija/code/device_data_integrity_system/backend/witness.db')
Base = declarative_base()
print(engine.url)
# Base.metadata.create_all(engine)
# Session = sessionmaker(bind=engine)

# Define a class representing the table
class Car(Base):
    __tablename__ = 'iot_data_generator_car'
    uuid = Column(String, primary_key=True)
    brake_status = Column(Boolean, default=False)
    tires_status = Column(Boolean, default=False)
    engine_status = Column(Boolean, default=False)
    distance = Column(Integer, default=0)
    create_at = Column(DateTime, default=func.now())


class DatabaseManager:
    def __init__(self, engine):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    @contextmanager
    def session_scope(self):
        """Provide a transactional scope around a series of operations."""
        session = self.Session()
        try:
            yield session
            session.commit()
        except SQLAlchemyError as e:
            session.rollback()
            print(f"An error occurred: {e}")
            raise
        finally:
            session.close()


class Database(DatabaseManager):
    def __init__(self, engine):
        super().__init__(engine) 

    def create_table(self):
        try:
            Base.metadata.create_all(self.engine)  # Use Base from the global scope
        except SQLAlchemyError as e:
            print(f"An error occurred while creating tables: {e}")

    def insert_data(self, data):
        with self.session_scope() as session:
            new_car = Car(uuid=data['uuid'], brake_status=data.get('brake_status', False),
                        tires_status=data.get('tires_status', False), engine_status=data.get('engine_status', False),
                        distance=data.get('distance', 0))
            session.add(new_car)

    def get_data(self, public_key):
        with self.session_scope() as session:
            return session.query(Car).filter_by(uuid=public_key).first()
    
    def get_data_user(self, public_key):
        with self.session_scope() as session:
            return session.query(User).filter_by(uuid=public_key).first()
        
    def update_data(self, public_key, data):
        with self.session_scope() as session:
            car = session.query(Car).filter_by(uuid=public_key).first()
            if car:
                for key, value in data.items():
                    setattr(car, key, value)
            else:
                print(f"No car found with public_key: {public_key}")


    def delete_data(self, public_key):
        with self.session_scope() as session:
            car = session.query(Car).filter_by(public_key=public_key).first()
            if car:
                session.delete(car)
            else:
                print(f"No car found with public_key: {public_key}")



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


