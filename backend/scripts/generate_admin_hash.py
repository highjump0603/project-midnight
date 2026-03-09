"""
Run this script to generate the bcrypt hash for your admin password.
Usage: python scripts/generate_admin_hash.py

Then put the output in your .env as ADMIN_PASSWORD_HASH=<hash>
"""
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

password = input("Enter admin password: ")
hashed = pwd_context.hash(password)
print(f"\nADMIN_PASSWORD_HASH={hashed}")
