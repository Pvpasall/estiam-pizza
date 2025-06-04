from fastapi import APIRouter, HTTPException, Depends, Request, Response
from sqlmodel import Session, select
from pydantic import BaseModel
from passlib.context import CryptContext
from app.database import StoreUser
from app.database import get_session
import secrets
from app.schemas import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

active_sessions = {}

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_session(user_id: str) -> str:
    session_token = secrets.token_urlsafe(32)
    active_sessions[session_token] = user_id
    return session_token

def get_current_user(request: Request, session: Session = Depends(get_session)) -> StoreUser:
    session_token = request.cookies.get("session_token")
    
    if not session_token or session_token not in active_sessions:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = active_sessions[session_token]
    statement = select(StoreUser).where(StoreUser.id == user_id)
    user = session.exec(statement).first()
    
    if not user:
        del active_sessions[session_token]
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

@router.post("/login", response_model=LoginResponse)
def login(login_data: LoginRequest, response: Response, session: Session = Depends(get_session)):
    statement = select(StoreUser).where(StoreUser.username == login_data.username)
    user = session.exec(statement).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not user.is_active:
        raise HTTPException(status_code=401, detail="User account is disabled")

    session_token = create_session(str(user.id))
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        max_age=3600,   
        samesite="lax"
    )
    
    return LoginResponse(
        message="Login successful",
        user_id=str(user.id),
        username=user.username
    )

@router.get("/me")
def get_me(current_user: StoreUser = Depends(get_current_user)):
    return {
        "user_id": str(current_user.id),
        "username": current_user.username,
        "email": current_user.email,
        "is_active": current_user.is_active
    }

@router.post("/logout")
def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    
    if session_token and session_token in active_sessions:
        del active_sessions[session_token]
    
    response.delete_cookie("session_token")
    return {"message": "Logged out successfully"}