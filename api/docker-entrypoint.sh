#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
pdm run manage.py migrate

# Load test samples
echo "Load test samples"
pdm run manage.py migrate

# Start server
echo "Starting server"
pdm run local_server