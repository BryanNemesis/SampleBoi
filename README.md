# Sampleboi

### **A sounbdboard app which**:
- is mobile-friendly
- looks like Akai MPC
- Lit af fam fr no cap

## Tech stack

UI: React, Typescript, Vite, Tailwind CSS

API: Django, DRF, PDM

DB: Postgres

## Running app locally

Run
```
docker-compose up
```

App is now accessible under localhost:5173.

## Development of api

In the API, PDM is used as package manager. This means that some stuff is done differently than usually.

### Adding new packages

Attach to the container and from there:

```
pdm add <package>
```

### Running manage.py commands

Prepend your commands with `pdm run`, e.g.

```
pdm run manage.py makemigrations
```

### VS Code highlighting

Although api is run in docker, you can install packages locally for editor support.

Create a venv with pdm:
```
pdm venv create 3.11
```
Activate the venv and install packages:
```
pdm sync
```

