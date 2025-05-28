from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def get_orders():
    return {"message":"Hello world"}