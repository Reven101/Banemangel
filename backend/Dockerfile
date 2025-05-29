# Start med et offisielt Python runtime som base image
FROM python:3.10-slim

# Sett arbeidsmappen i containeren
WORKDIR /app

# Installer systemavhengigheter for Playwright (hvis du trenger full browser support i Docker)
# Dette kan variere litt basert på hvilke nettlesere Playwright skal styre.
# For Chromium:
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libatspi2.0-0 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libxtst6 \
    && rm -rf /var/lib/apt/lists/*

# Kopier requirements-filen først for å dra nytte av Docker layer caching
COPY requirements.txt requirements.txt

# Installer Python-avhengigheter
RUN pip install --no-cache-dir -r requirements.txt

# Installer Playwrights nettlesere
RUN playwright install --with-deps chromium
# Hvis du trenger andre, f.eks. firefox, webkit:
# RUN playwright install firefox webkit

# Kopier resten av applikasjonskoden inn i containeren
COPY . .

# Definer kommandoen for å kjøre applikasjonen når containeren starter
# Antar at FastAPI-appen din vil hete main.py og app-objektet inni der heter app
# Port 8000 er vanlig for FastAPI-apper i Docker
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]