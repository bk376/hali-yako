#!/bin/bash

# requires bash4 on the system. /usr/bin/env SHELL switch to bash4?
# run as:
# source run_app.sh <environment name> <host name> <port number>
# e.g: source run_app.sh dev_local 0.0.0.0 8280

# this script requires a GCP project to be configured in your machine:
# show the current project with: gcloud config list
# please see the project wiki for more info
HOST_NAME=$1
PORT_NUMBER=$2

export FLASK_APP=flask_app.py
export FLASK_DEBUG=1

# activate virtual environment
source venv/bin/activate

# apply host & port args if they were specified, else set to the defaults (localhost, 8080)
if [ -z $HOST_NAME ]
then
    flask run -h localhost -p 8080
else
    flask run --host=$HOST_NAME --port=$PORT_NUMBER
fi