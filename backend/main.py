from fastapi import FastAPI

app = FastAPI(title="Trading Championship API")

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do Campeonato de Trading"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
