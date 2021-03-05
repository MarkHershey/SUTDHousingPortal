# SUTD HousingPortal

Focusing on transparent application process and easy-to-use UI, this is the proposed web-based Housing Portal MVP for SUTD.

## Stack

-   Backend
    -   [FastAPI](https://fastapi.tiangolo.com/) (Python high performance web framework)
    -   [Uvicorn](https://www.uvicorn.org/) (Python asynchronous ASGI server)
    -   [mongoDB](https://www.mongodb.com/)
-   Frontend
    -   [React](https://reactjs.org/)
    -   [Bootstrap](https://getbootstrap.com/)
-   Deployment
    -   [NGINX](https://www.nginx.com/)
    -   [Docker](https://www.docker.com/)
-   Testing
    -   [pytest](https://docs.pytest.org/en/stable/)
    -   [selenium](https://selenium-python.readthedocs.io/)

## Development

### Dependencies

-   Backend requires \*NIX system. ([Uvicorn](https://www.uvicorn.org/) depends on [uvloop](https://github.com/MagicStack/uvloop) which is not supported on Windows)
-   Python 3.6+

```bash
# At project root `YOUR/PATH/SUTDHousingPortal`
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install --upgrade pip wheel setuptools
$ pip install -r requirements.txt

# if any packages not install properly, try this
$ pip install --upgrade bcrypt pyjwt fastapi markkk passlib requests pytest uvicorn
```

### Run backend server locally

```bash
# At project root `YOUR/PATH/SUTDHousingPortal`
$ uvicorn src.api.main:app --reload
```

Check API documentation after firing up local server

```
http://127.0.0.1:8000/docs
```

### Run tests

```bash
# At project root `YOUR/PATH/SUTDHousingPortal`
$ pytest
```

## Developers

-   Huang He - [@MarkHershey](https://github.com/MarkHershey)
-   Wang Chenyu - [@JamesNolan17](https://github.com/JamesNolan17)
-   Justin Peng - [@Fattyboy9898](https://github.com/Fattyboy9898)
-   Ong Zhi Yi - [@gzyon](https://github.com/gzyon)

## Disclaimers

-   [MIT License](LICENSE) Copyright (c) 2021
-   This application is developed to fulfill the course requirement of SUTD 50.003 Elements of Software Construction (2021 Spring).
