FROM python:3.10
WORKDIR /app
COPY pyproject.toml peotry.lock* ./
RUN pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi
COPY . .
CMD ["poetry", "run", "pytest", "--maxfail=1", "--disable-warnings", "-q"]