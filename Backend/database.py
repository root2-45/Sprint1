# # ================================================================
# #  database.py — MongoDB connection & helpers for MetaLens
# # ================================================================
# import os
# from datetime import datetime
# from bson import ObjectId
# from pymongo import MongoClient, DESCENDING
# from dotenv import load_dotenv

# # Load .env file
# load_dotenv()

# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# MONGO_DB  = os.getenv("MONGO_DB", "metalens")

# # ================================================================
# #  Connection
# # ================================================================
# _client = None


# def get_client():
#     """Return a shared MongoClient (lazy init)."""
#     global _client
#     if _client is None:
#         _client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
#     return _client


# def get_db():
#     """Return the metalens database."""
#     return get_client()[MONGO_DB]


# def reports_collection():
#     return get_db()["reports"]


# def users_collection():
#     """Placeholder for Phase 2 — not used yet."""
#     return get_db()["users"]


# # ================================================================
# #  Helpers
# # ================================================================
# def _serialize(doc):
#     """Convert Mongo doc → JSON-safe dict (ObjectId → str, dates → ISO)."""
#     if not doc:
#         return None
#     doc = dict(doc)
#     if "_id" in doc:
#         doc["id"] = str(doc["_id"])
#         del doc["_id"]
#     if "created_at" in doc and isinstance(doc["created_at"], datetime):
#         doc["created_at"] = doc["created_at"].isoformat()
#     return doc


# # ================================================================
# #  Reports CRUD
# # ================================================================
# def save_report(report: dict) -> str:
#     """Insert a report. Returns the new report id as a string."""
#     doc = dict(report)
#     doc["created_at"] = datetime.utcnow()
#     # user_id will be added in Phase 2; set None for now
#     doc.setdefault("user_id", None)
#     result = reports_collection().insert_one(doc)
#     return str(result.inserted_id)


# def get_all_reports(limit: int = 100):
#     """Return latest reports, most recent first."""
#     cursor = reports_collection().find().sort("created_at", DESCENDING).limit(limit)
#     return [_serialize(doc) for doc in cursor]


# def get_report_by_id(report_id: str):
#     """Fetch a single report by its id."""
#     try:
#         doc = reports_collection().find_one({"_id": ObjectId(report_id)})
#         return _serialize(doc)
#     except Exception as e:
#         print(f"❌ get_report_by_id error: {e}")
#         return None


# def delete_report(report_id: str) -> bool:
#     """Delete a report. Returns True if one was deleted."""
#     try:
#         result = reports_collection().delete_one({"_id": ObjectId(report_id)})
#         return result.deleted_count == 1
#     except Exception as e:
#         print(f"❌ delete_report error: {e}")
#         return False


# def reports_count() -> int:
#     """Total number of reports in the DB."""
#     return reports_collection().count_documents({})


# # ================================================================
# #  Test connection (run this file directly to verify)
# # ================================================================
# if __name__ == "__main__":
#     print("=" * 60)
#     print(f"🔌 Connecting to: {MONGO_URI}")
#     print(f"📂 Database: {MONGO_DB}")
#     print("=" * 60)
#     try:
#         client = get_client()
#         client.admin.command("ping")
#         print("✅ MongoDB connection OK")
#         print(f"📊 Reports in DB: {reports_count()}")
#     except Exception as e:
#         print(f"❌ Connection FAILED: {e}")












# ================================================================
#  database.py — MongoDB connection & helpers for MetaLens
# ================================================================
import os
from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient, DESCENDING
from dotenv import load_dotenv

# Load .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB  = os.getenv("MONGO_DB", "metalens")

# ================================================================
#  Connection
# ================================================================
_client = None


def get_client():
    global _client
    if _client is None:
        _client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    return _client


def get_db():
    return get_client()[MONGO_DB]


def reports_collection():
    return get_db()["reports"]


def users_collection():
    return get_db()["users"]


# ================================================================
#  Serialize
# ================================================================
def _serialize(doc):
    if not doc:
        return None
    doc = dict(doc)
    if "_id" in doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    for key in ("created_at", "last_login"):
        if key in doc and isinstance(doc[key], datetime):
            doc[key] = doc[key].isoformat()
    return doc


def _serialize_user(doc):
    """Serialize a user, but HIDE password_hash."""
    if not doc:
        return None
    doc = _serialize(doc)
    doc.pop("password_hash", None)
    return doc


# ================================================================
#  Reports CRUD (with user_id support)
# ================================================================
def save_report(report: dict, user_id: str = None) -> str:
    """Insert a report. If user_id provided, links to that user."""
    doc = dict(report)
    doc["created_at"] = datetime.utcnow()
    doc["user_id"] = str(user_id) if user_id else None
    result = reports_collection().insert_one(doc)
    return str(result.inserted_id)


def get_all_reports(limit: int = 100, user_id: str = None):
    """Return latest reports. If user_id provided, filter by owner."""
    query = {}
    if user_id:
        query["user_id"] = str(user_id)
    cursor = reports_collection().find(query).sort("created_at", DESCENDING).limit(limit)
    return [_serialize(doc) for doc in cursor]


def get_report_by_id(report_id: str, user_id: str = None):
    """Fetch one report. If user_id provided, verify ownership."""
    try:
        query = {"_id": ObjectId(report_id)}
        if user_id:
            query["user_id"] = str(user_id)
        doc = reports_collection().find_one(query)
        return _serialize(doc)
    except Exception as e:
        print(f"❌ get_report_by_id error: {e}")
        return None


def delete_report(report_id: str, user_id: str = None) -> bool:
    """Delete report. If user_id provided, only deletes if owner matches."""
    try:
        query = {"_id": ObjectId(report_id)}
        if user_id:
            query["user_id"] = str(user_id)
        result = reports_collection().delete_one(query)
        return result.deleted_count == 1
    except Exception as e:
        print(f"❌ delete_report error: {e}")
        return False


def reports_count(user_id: str = None) -> int:
    query = {}
    if user_id:
        query["user_id"] = str(user_id)
    return reports_collection().count_documents(query)


# ================================================================
#  Users CRUD
# ================================================================
def create_user(email: str, password_hash: str, name: str) -> dict:
    """Insert a new user. Raises if email exists."""
    email = email.lower().strip()
    if users_collection().find_one({"email": email}):
        raise ValueError("Email already registered")

    doc = {
        "email": email,
        "name": name.strip(),
        "password_hash": password_hash,
        "created_at": datetime.utcnow(),
        "last_login": None,
    }
    result = users_collection().insert_one(doc)
    doc["_id"] = result.inserted_id
    return _serialize_user(doc)


def get_user_by_email(email: str):
    """Return full user doc (INCLUDING password_hash) — for login only."""
    email = email.lower().strip()
    return users_collection().find_one({"email": email})


def get_user_by_id(user_id: str):
    """Return public user doc (no password_hash)."""
    try:
        doc = users_collection().find_one({"_id": ObjectId(user_id)})
        return _serialize_user(doc)
    except Exception:
        return None


def update_last_login(user_id: str):
    try:
        users_collection().update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"last_login": datetime.utcnow()}}
        )
    except Exception as e:
        print(f"⚠️ update_last_login: {e}")


def users_count() -> int:
    return users_collection().count_documents({})


# ================================================================
#  Test
# ================================================================
if __name__ == "__main__":
    print("=" * 60)
    print(f"🔌 Connecting to: {MONGO_URI}")
    print(f"📂 Database: {MONGO_DB}")
    print("=" * 60)
    try:
        client = get_client()
        client.admin.command("ping")
        print("✅ MongoDB connection OK")
        print(f"📊 Reports in DB: {reports_count()}")
        print(f"👥 Users in DB:   {users_count()}")
    except Exception as e:
        print(f"❌ Connection FAILED: {e}")