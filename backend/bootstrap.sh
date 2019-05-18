#!/bin/bash
export FLASK_APP=./src/main.py
export FLASK_RUN_PORT=8050
source $(pipenv --venv)/Scripts/activate
#app.run(debug=True)
flask run -h 127.0.0.1
