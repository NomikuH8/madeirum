from cryptography.hazmat.primitives import serialization
import datetime
import calendar
import hashlib
import bcrypt
import jwt

# default: 8 hours. change in function if want another measurement
TIME_EXPIRATION = 8

private_key = open('.ssh/id_rsa', 'r').read()
public_key = open('.ssh/id_rsa.pub', 'r').read()
key = serialization.load_ssh_private_key(
    private_key.encode(),
    password=open('.ssh/b64_pass', 'rb').read()
)

public_key = serialization.load_ssh_public_key(public_key.encode())


def get_token(payload: dict):
    exp_date = datetime.datetime.utcnow() + datetime.timedelta(hours=TIME_EXPIRATION)
    payload['exp'] = calendar.timegm(exp_date.timetuple())
        
    new_token = jwt.encode(
        payload, key, 'RS256'
    )
    return new_token


def is_token_valid(token: str):
    try:
        header_data = jwt.get_unverified_header(token)
        new_token = jwt.decode(
            token,
            public_key,
            [header_data['alg'], ]
        )
        return True
    except:
        return False


def check_password(pw1: str, pw_hashed: str):
    # print(f'''pw: {pw1}, result: {
    #     pw_hashed.encode("utf8") == bcrypt.hashpw(pw1.encode("utf8"), pw_hashed.encode("utf8"))
    # }''')
    return pw_hashed.encode('utf8') == bcrypt.hashpw(pw1.encode('utf8'), pw_hashed.encode('utf8'))


def encrypt_password(pw: str):
    salt = bcrypt.gensalt()
    hashed_pw = bcrypt.hashpw(pw.encode('utf8'), salt)
    return hashed_pw.decode('utf8')


if __name__ == '__main__':
    payload = {
        'id_usuario': 123,
        'email': 'jorge@gmail.com',
        'senha': 'eusoujorge',
    }

    # token = getToken(payload)
    # print(token)
    print()
    # print(decryptToken(token))
    # encrypt_password('jorge')