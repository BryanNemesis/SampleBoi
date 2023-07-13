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

To add some samples, run pdm run manage.py add_samples inside the api container.

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

## Troubleshooting

```Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "/app/docker-entrypoint.sh": permission denied: unknown```

Run `chmod +x api/docker-entrypoint.sh` locally, before the images build.
https://stackoverflow.com/a/69483712