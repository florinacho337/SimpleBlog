#!/bin/bash

# Wait for the PostgreSQL database to be ready
./wait-for-it.sh db:5432 -- echo "Postgres is up - executing command"

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Start server
echo "Starting server"
exec gunicorn --bind 0.0.0.0:8000 back_end.wsgi