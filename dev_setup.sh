#!/usr/bin/env bash


# check whether dir 'venv' exists
venv_exists=0
printf ">>> Checking current directory... \n"
if [ -d "venv" ]; then
    printf ">>> 'venv' already exists. \n"
    venv_exists=1
else
    printf ">>> \xE2\x9C\x94 OK \n"

fi

# check python version
printf "\n>>> Checking Python version... \n"
version=$(python -V)
if [[ "$version" == "Python 3."* ]]; then
    printf ">>> \xE2\x9C\x94 $version \n"
    use_python=true
else
    version=$(python3 -V)
    if [[ "$version" == "Python 3."* ]]; then
        printf ">>> \xE2\x9C\x94 $version \n"
    else
        printf ">>> Error: Python 3.x not found."
        printf ">>> Aborting... \n"
        exit 1
    fi
fi

# use python 3 create virtual environment
if [ ${venv_exists} -eq 0 ]; then
    if [ "$use_python" == true ]; then
        printf "\n>>> python -m venv venv \n"
        python -m venv venv || exit 1
    else
        printf "\n>>> python3 -m venv venv \n"
        python3 -m venv venv || exit 1
    fi
    printf ">>> \xE2\x9C\x94 OK \n"
fi

# activate the virtual environment
printf "\n>>> source venv/bin/activate \n"
source venv/bin/activate
printf ">>> \xE2\x9C\x94 OK \n"

# update pip
printf "\n>>> pip install --upgrade pip wheel setuptools \n"
pip install --upgrade pip wheel setuptools

printf ">>> \xE2\x9C\x94 OK \n"

# check file 'requirements.txt' exist
# if [ -f "requirements.txt" ]; then
#     # install requirements
#     printf "\n>>> pip install -r requirements.txt \n"
#     pip install -r requirements.txt
# else
#     printf "\n>>> 'requirements.txt' does not exist \n"
# fi
# printf ">>> \xE2\x9C\x94 OK \n"

# install project dependencies
printf "\n>>> pip install project dependencies...\n"
pip install --upgrade bcrypt pyjwt fastapi markkk passlib requests pytest uvicorn dnspython pymongo pytest-cov selenium

printf ">>> \xE2\x9C\x94 OK \n"


printf "\n>>> \xE2\x9C\x94 Python backend development environement setup done! \n\n"