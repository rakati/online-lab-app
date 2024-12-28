import os
import logging
from time import time, sleep
import psycopg2

# Get environment variables
check_timeout = int(os.getenv("POSTGRES_CHECK_TIMEOUT", 30))
check_interval = int(os.getenv("POSTGRES_CHECK_INTERVAL", 1))
interval_unit = "second" if check_interval == 1 else "seconds"

config = {
    "dbname": os.getenv("POSTGRES_DB", "postgres"),
    "user": os.getenv("POSTGRES_USER", "postgres"),
    "password": os.getenv("POSTGRES_PASSWORD", ""),
    "host": os.getenv("DATABASE_URL", "postgres"),
}

# Setup logger
start_time = time()
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


def pg_isready(dbname, user, password, host):
    while time() - start_time < check_timeout:
        try:
            conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host)
            logger.info("Postgres is ready! ✨ 💅")
            conn.close()
            return True
        except psycopg2.OperationalError:
            logger.info(f"Postgres isn't ready. Waiting for {check_interval} {interval_unit}...")
            sleep(check_interval)

    logger.error(f"We could not connect to Postgres within {check_timeout} seconds.")
    return False


pg_isready(**config)
