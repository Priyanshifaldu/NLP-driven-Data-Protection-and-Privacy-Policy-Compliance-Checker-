FROM python:3.10-slim

# --- System deps ---
RUN apt-get update && apt-get install -y build-essential poppler-utils

# --- Workdir ---
WORKDIR /app

# --- Install Python deps ---
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# --- Copy app ---
COPY . .

# Expose port
EXPOSE 8000

# Start API
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
