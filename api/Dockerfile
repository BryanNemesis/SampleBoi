FROM python:3.11.1-slim-buster

RUN apt-get update
RUN apt-get install -y libpq-dev gcc
RUN pip install pdm
WORKDIR /app
COPY pyproject.toml pdm.lock ./
RUN mkdir __pypackages__ && pdm install
COPY . .

CMD ["pdm", "run", "local_server"]