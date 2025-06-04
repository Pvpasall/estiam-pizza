## Backend Restaurant Pizza
### Présentation
Cette API est construite avec FastAPI, SQLModel et utilise une base de données SQLite.
Elle permet de gérer un système de commande de pizzas incluant :

- la consultation de pizzas disponibles,

- la création de clients,

- la création et la consultation des commandes,

- la gestion des utilisateurs et des rôles (store admin, etc.).

### Configuration
#### Installation
    1) Clonez le dépôt :
```bash
git clone https://github.com/votre-utilisateur/pizza-back.git
cd pizza-back
```
2) Installer poetry pour la gestion des dépendances: https://python-poetry.org/docs/

3) Cloner le projet

4) Créer un environnement virtuel:
```bash
poetry env use 3.10
```

5) Installer les dépendances du projet:
```bash
poetry install
```


#### Exécution
6) Lancer le serveur :
```bash
poetry run uvicorn app.main:app --reload
```

7) Accéder à l'API :
```bash
http://localhost:8000/docs
```

### Authentification

L’API utilise l’authentification JWT (JSON Web Tokens).
Vous devez être authentifié pour accéder à certaines routes (ex : création de commande, accès admin...).

### Documentation API

La documentation interactive est générée automatiquement par FastAPI :

Swagger UI : http://127.0.0.1:8000/docs

ReDoc : http://127.0.0.1:8000/redoc

 ### Tests    
- Exécuter les tests unitaires:
```bash
poetry run pytest
```

### Liens utiles
[Telechargement Python](https://www.python.org/downloads/)

[Documentation FastAPI](https://fastapi.tiangolo.com/)

[Documentation SQLModel](https://sqlmodel.tiangolo.com/)

[Poetry](https://python-poetry.org/)

