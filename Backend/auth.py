# ================================================================
#  auth.py — Password hashing + JWT + require_auth decorator
# ================================================================
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me-in-production-please")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_DAYS = 7


# ================================================================
#  Password hashing
# ================================================================
def hash_password(plain: str) -> str:
    """Hash a plain password with bcrypt."""
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(plain.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    """Check a plain password against a bcrypt hash."""
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


# ================================================================
#  JWT
# ================================================================
def create_token(user_id: str, email: str) -> str:
    """Create a signed JWT for a user."""
    payload = {
        "user_id": str(user_id),
        "email": email,
        "exp": datetime.utcnow() + timedelta(days=JWT_EXPIRY_DAYS),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str):
    """Decode + verify a JWT. Returns payload dict or None."""
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        print("⚠️ Token expired")
        return None
    except jwt.InvalidTokenError as e:
        print(f"⚠️ Invalid token: {e}")
        return None


# ================================================================
#  Decorator: @require_auth
# ================================================================
def require_auth(f):
    """Decorator — protects a route. Injects request.user_id and request.user_email."""
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid Authorization header"}), 401

        token = auth_header[7:]  # strip "Bearer "
        payload = decode_token(token)

        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401

        # Attach to request for use inside the route
        request.user_id = payload.get("user_id")
        request.user_email = payload.get("email")

        return f(*args, **kwargs)
    return wrapper


# ================================================================
#  Test (run: python auth.py)
# ================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("🔐 auth.py self-test")
    print("=" * 60)

    # Hash test
    pw = "mypassword123"
    h = hash_password(pw)
    print(f"Plain:  {pw}")
    print(f"Hash:   {h[:40]}...")
    print(f"Verify: {verify_password(pw, h)} (expect True)")
    print(f"Wrong:  {verify_password('wrongpass', h)} (expect False)")

    # Token test
    tok = create_token("user123", "test@example.com")
    print(f"\nToken:  {tok[:50]}...")
    payload = decode_token(tok)
    print(f"Decoded: {payload}")
    print("\n✅ auth.py works")