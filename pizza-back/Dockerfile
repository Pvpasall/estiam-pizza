# Dockerfile pour le backend Python
FROM python:3.11-slim

WORKDIR /app

# Copier et installer les dépendances
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copier tout le code source
COPY . .

EXPOSE 8000

# Commande de démarrage (à ajuster selon le développement backend)
CMD ["python", "-m", "uvicorn", "src.pizza_back.main:app", "--host", "0.0.0.0", "--port", "8000"]