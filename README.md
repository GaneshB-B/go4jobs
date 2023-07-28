
# go4jobs | README

## Backend

Run these commands from the terminal within the backend (parent of app) folder; after you clone the repo.

- Create the python virtual environment

    `python -m venv .venv`

- Activate the virtual environment

    `source .venv/bin/activate`

    OR

    `source path_to_backend_folder/.venv/bin/activate`

- Install the required python packages

    `pip install -r requirements.txt`

- Configure the app

    - Create a file `env.py` in `app/config` folder

    - Add the required config variables following the `env.py.example` file
    
    - Set the appropriate values for the config variables in `env.py`

- Run the backend server

    `python app`

    Please refer <https://www.uvicorn.org/#command-line-options> for further uvicorn server configuration options.

- Visit `/docs` or `/redoc` for the API Documentation

---

## Frontend

Run these commands from the terminal within the frontend (parent of src) folder; after you clone the repo.

- Install the Node.js packages

    `npm install`

- Configure the app

    - Create a file `.env.local` in `frontend` folder

    - Add the required config variables following the `.env.local.example` file

    - Set the appropriate values for the config variables in `.env.local`

    - Set the port number within the `config` object in the `package.json` file

- Generate the build files

    `npm run build`

- Run the frontend server

    `npm run start`
