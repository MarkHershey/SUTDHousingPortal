#!/usr/bin/env bash

# update pip
printf "\n>>> pip3 install --upgrade pip wheel setuptools \n"
pip install --upgrade pip wheel setuptools
printf ">>> \xE2\x9C\x94 OK \n"


# install project dependencies
printf "\n>>> pip3 install project dependencies...\n"
pip install --upgrade bcrypt pyjwt fastapi markkk passlib requests pytest uvicorn dnspython pymongo 
printf ">>> \xE2\x9C\x94 OK \n"