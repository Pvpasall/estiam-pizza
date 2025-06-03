# Dockerfile pour le backend Python - PizzaTech
FROM python:3.11-slim

WORKDIR /app

# Installer Poetry
RUN pip install --upgrade pip && \
    pip install poetry

# Copier les fichiers de configuration Poetry
COPY pyproject.toml poetry.lock ./

# Configurer Poetry et installer les dépendances
RUN poetry config virtualenvs.create false && \
    poetry install --only=main --no-interaction --no-root

# Copier tout le code source
COPY . .

EXPOSE 8000

# Démarrer l'API FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]