## Backend Restaurant Pizza

### Démmarer le server en local
- Installer poetry pour la gestion des dépendances: https://python-poetry.org/docs/

- Cloner le projet

- Créer un environnement virtuel:
```bash
poetry env use 3.10
```

- Installer les dépendances du projet:
```bash
poetry install
```

- Lancer le serveur:
```bash
poetry run uvicorn app.main:app --reload
```

- Accéder à l'API:

```bash
http://localhost:8000/docs
```

- Exécuter les tests unitaires:
```bash
poetry run pytest
```