import os
import hashlib
import json
import datetime
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from contextlib import contextmanager

load_dotenv()

# TODO: do this only ones when the app is started
engine = create_engine('sqlite:////home/ilija/code/device_data_integrity_system/backend/witness.db')
Base = declarative_base()

# Define a class representing the table
class Car(Base):
    __tablename__ = 'iot_data_generator_car'
    uuid = Column(String, primary_key=True)
    brake_status = Column(Boolean, default=False)
    tires_status = Column(Boolean, default=False)
    engine_status = Column(Boolean, default=False)
    distance = Column(Integer, default=0)
    create_at = Column(DateTime, default=func.now())




class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            # Format the datetime object as a string here. You can change the format as needed.
            return obj.isoformat()
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)

class Helpers():
    @staticmethod
    def get_env_var(index):
        private_key = os.environ.get(f"PRIVATE_KEY_{index}").encode()
        public_key = os.environ.get(f"PUBLIC_KEY_{index}").encode()
        return private_key, public_key

    @staticmethod
    def hash_public_key(public_key):
        # Create a SHA-256 hash object
        hash_obj = hashlib.sha256()
        
        # Update the hash object with the public key bytes
        hash_obj.update(public_key)
        
        # Generate the hash digest as a hexadecimal string
        hash_hex = hash_obj.hexdigest()
        
        return hash_hex
    
    
    @staticmethod
    def row2dict(row):
        row_dict = {column.name: getattr(row, column.name) for column in row.__table__.columns}
        return json.dumps(row_dict, cls=DateTimeEncoder)

class DatabaseSessionManager:
    def __init__(self, engine):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    @contextmanager
    def session_scope(self):
        """Provide a transactional scope around a series of operations."""
        session = self.Session()
        try:
            yield session
        except SQLAlchemyError as e:
            session.rollback()
            print(f"An error occurred: {e}")
            raise
        else:
            session.commit()
        finally:
            session.close()

class Database(DatabaseSessionManager, Helpers):
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
                        distance=data.get('distance', 0), create_at=func.now())
            session.add(new_car)

    def get_data(self, public_key):
        with self.session_scope() as session:
            result = session.query(Car).filter_by(uuid=public_key).first()
            if result:
                return Database.row2dict(result)
    
    def update_data(self, public_key, data):
        with self.session_scope() as session:
            car = session.query(Car).filter_by(uuid=public_key).first()
            if car:
                for key, value in data.items():
                    if key == 'distance':
                        # Assuming 'distance' is an integer or float. Adjust parsing as necessary.
                        current_distance = getattr(car, 'distance', 0)  # Get current distance, default to 0 if not set
                        new_distance = current_distance + value  # Add the new distance to the current distance
                        setattr(car, 'distance', new_distance)  # Update the car object with the new total distance
                    else:
                        setattr(car, key, value)  # For all other keys, overwrite the value as before
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
    database = Database(engine)
    data = {
        "uuid": "39bf0b6f33eb720e3681896aaf5f6a1a3cbf98d17c99df389562995612b515c9",  # Assuming this is the public key
        "brake_status": False,
        "tires_status": False,
        "engine_status": False,
        "distance": 5,
        "create_at": func.now(),
    }
    # database.update_data("39bf0b6f33eb720e3681896aaf5f6a1a3cbf98d17c99df389562995612b515c9", data)
    # database.create_table()
    database.insert_data(data)
    # print(database.get_data("39bf0b6f33eb720e3681896aaf5f6a1a3cbf98d17c99df389562995612b515c9"))
