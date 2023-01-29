FROM python:3.11.1-slim-buster

RUN pip install pdm
COPY . /app
WORKDIR /app
RUN pdm sync

CMD pdm run server
