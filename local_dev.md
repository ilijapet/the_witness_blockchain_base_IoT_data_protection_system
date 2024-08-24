### Git clone repo

    git clone git@github.com:ilijapet/the_witness_blockchain_base_IoT_data_protection_system.git
    cd the_witness_blockchain_base_IoT_data_protection_system

### Adding envirnomet variables

Add `.env` file to `cartesi_frontend` and to `cartesi_backend`. Then add `.env_dev` to backend

### Create, activate venv's, install dependencies, build docker image and run containers and servers

#### Backend

    cd backend
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    python -m manage createsuperuser # or use ilijapet@gmail.com

This user should be used for loging into frontend. or you can register user via frontend # ones react server is up and runing locally

#### Cartesi backend

In separate terminal

    cd cartesi_backend
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    cartesi build

#### React fronetend

In separate terminal

    cd cartesi_frontend
    npm install

### Run Server

### Test The Witness dapp

From cartesi_frontend

    npm run dev

From cartesi_backend

    cartesi run

From backend folder

    python -m manager runserver 8005

Then go to the front-end, log as superuser for example and check how The Witness dapp is working
