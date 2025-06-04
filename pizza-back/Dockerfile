FROM python:3.11-slim

WORKDIR /app

# Dépendances système
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Installer Poetry
RUN pip install --no-cache-dir poetry

# Copier les fichiers de config
# COPY pyproject.toml poetry.lock* README.md ./
COPY . .

# Installer les dépendances (prod uniquement)
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copier le code source

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]