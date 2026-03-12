from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import auth, projects, blog, contact, stats, settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup — create tables (use Alembic in production instead)
    if settings.app_env == "development":
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await engine.dispose()


app = FastAPI(
    title="Project Midnight API",
    description="Backend API for project-midnight.dev portfolio",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url=None,
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(stats.router)
app.include_router(settings.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "project-midnight-api"}
