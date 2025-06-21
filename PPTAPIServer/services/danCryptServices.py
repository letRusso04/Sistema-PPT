from passlib.context import CryptContext

class DanCryptServices:
    """
    Se implementará en futuras actualizaciones.
    """
    crypt = CryptContext(
        schemes=["pbkdf2_sha256"],
        default="pbkdf2_sha256",
        pbkdf2_sha256__default_rounds=30000
    )