# online_lab_app

[![Build Status](https://travis-ci.org/rakati/online_lab_app.svg?branch=master)](https://travis-ci.org/rakati/online_lab_app)
[![Built with](https://img.shields.io/badge/Built_with-Cookiecutter_Django_Rest-F7B633.svg)](https://github.com/agconti/cookiecutter-django-rest)

Backend for the Online Lab Application. Check out the project's [documentation](http://rakati.github.io/online_lab_app/).

# Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)

# Local Development

Start the dev server for local development:
```bash
docker-compose up
```

Run a command inside the docker container:

```bash
docker-compose run --rm web [command]
```

## Testing
### Test JWT Endpoints getting token
1. Create super user using: `python manage.py createsuperuser`
2. request token from the api using
```bash
curl -X POST http://localhost:8000/api/token/ -d "username=<testuser>&password=<password123>"
```
*Note: Make sure to replace placeholder `<>` with you info.*
