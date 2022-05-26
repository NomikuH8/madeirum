from cryptography.hazmat.primitives import serialization
import datetime
import calendar
import hashlib
import jwt

# default: 1 day. change in function if want another measurement
TIME_EXPIRATION = 1

private_key = open('.ssh/id_rsa', 'r').read()
public_key = open('.ssh/id_rsa.pub', 'r').read()
key = serialization.load_ssh_private_key(
    private_key.encode(),
    password=open('.ssh/b64_pass', 'rb').read()
)

def getToken(payload: dict):
    exp_date = datetime.datetime.utcnow() + datetime.timedelta(days=TIME_EXPIRATION)
    payload['exp'] = calendar.timegm(exp_date.timetuple())
        
    new_token = jwt.encode(
        payload, key, 'RS256'
    )
    return new_token

def decryptToken(token: str):
    header_data = jwt.get_unverified_header(token)
    new_token = jwt.decode(
        token,
        public_key,
        [header_data['alg'], ]
    )
    return new_token

# simple sha256 encryption, no salting or pepper
def encryptPassword(pw: str):
    sha = hashlib.sha256(pw.encode()).hexdigest()
    return sha

if __name__ == '__main__':
    payload = {
        'id_usuario': 123,
        'email': 'jorge@gmail.com',
        'senha': 'eusoujorge',
    }

    token = getToken(payload)
    print(token)
    print(encryptPassword('a'))