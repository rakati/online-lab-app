# online_lab_app

[![Build Status](https://travis-ci.org/rakati/online_lab_app.svg?branch=master)](https://travis-ci.org/rakati/online_lab_app)
[![Built with](https://img.shields.io/badge/Built_with-Cookiecutter_Django_Rest-F7B633.svg)](https://github.com/agconti/cookiecutter-django-rest)

Backend for the Online Lab Application. Check out the project's [documentation](http://rakati.github.io/online_lab_app/).

# Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)

# Initialize the project

Start the dev server for local development:

```bash
docker-compose up
```

Create a superuser to login to the admin:

```bash
docker-compose run --rm web ./manage.py createsuperuser
```
