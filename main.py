from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.routes import router

app = FastAPI()

# Serve static files from the public directory (with index.html as the default)
app.mount("/", StaticFiles(directory="public", html=True), name="static")

# Include API routes under the /api prefix
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
