import hashlib

def encryptText(text: str):
    encoded = text.encode()
    encrypted = hashlib.sha256(encoded)
    return encrypted.hexdigest()

if __name__ == '__main__':
    print(encryptText('a'))
    print(encryptText('aa'))
    print(encryptText('b'))
    print(encryptText('bb'))