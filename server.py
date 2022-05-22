from dotenv import dotenv_values

from flask import render_template
from flask import make_response
from flask import send_file
from flask import request
from flask import Flask
import psycopg2
import random
import utils
import sys
import os

PORT = 5000

app = Flask(__name__)
config = dotenv_values('.env')

tmp_path = ''
for i in config['BUILD_PATH'].split('/'):
    tmp_path = os.path.join(tmp_path, i)
BUILD_PATH = tmp_path
del tmp_path

create_table = {
    'usuarios': '''
    CREATE TABLE
        IF NOT EXISTS usuarios (
            id_usuario BIGSERIAL PRIMARY KEY,
            nome VARCHAR(60) NOT NULL,
            email VARCHAR(60) NOT NULL,
            senha VARCHAR(60) NOT NULL
        )
    ''',
    'usuarios_auth': '''
    CREATE TABLE
        IF NOT EXISTS usuarios_auth (
            id_token BIGSERIAL PRIMARY KEY,
            id_usuario INTEGER NOT NULL,
            auth_token VARCHAR NOT NULL UNIQUE
        )
    '''
}

def get_connection():
    try:
        return psycopg2.connect(
            database=config['DATABASE'],
            user=config['USER'],
            password=config["PASSWORD"],
            host=config["HOST"],
            port=config["PORT"],
        )
    except:
        return False

conn = get_connection()

if conn:
    print("Successfully connected to PostgreSQL.")
else:
    print("Failed to connected to PostgreSQL.")
    sys.exit(1)

curr = conn.cursor()

for i in create_table.keys():
    curr.execute(create_table[i])

conn.commit()


@app.route('/api/get_usuario')
def get_usuario():
    args = request.args
    email = ''
    try:
        email = request.args['email']
    except:
        return { 'help': 'missing arguments', 'success': False }

    curr.execute("SELECT id_usuario, nome, email FROM usuarios WHERE email=%s", [email])
    data = []
    ret = {}

    try:
        data = curr.fetchone()

        ret = {
            'id': data[0],
            'nome': data[1],
            'email': data[2],
        }
    except:
        return ret

    return ret

@app.route('/api/cadastrar_usuario')
def cadastrar_usuario():
    args = request.args

    nome = ''
    email = ''
    senha = ''
    try:
        nome = args['nome']
        email = args['email']
        senha = args['senha']
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    curr.execute("SELECT email FROM usuarios WHERE email=%s", [email])
    data = []
    try:
        data = curr.fetchall()[0]
        if len(data) > 0:
            return { 'help': 'email already used', 'success': False }
    except:
        curr.execute("INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)", [nome, email, senha])
        conn.commit()
        return { 'success': True }

@app.route('/api/logar_usuario', methods=['POST'])
def logar_usuario():
    args = request.args 
    try:
        email = args['email']
        senha = args['senha']
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    curr.execute('SELECT id, senha FROM usuarios WHERE email=%s', [email])
    data = []
    try:
        data = curr.fetchall()[0]
    except:
        return { 'help': 'user not found', 'success': False }
    
    if data[1] != senha:
        return { 'help': 'wrong password', 'success': False }
    
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
    randLength = 30
    decryptedToken = ''.join(random.choice(alphabet) for i in range(randLength))
    encryptedToken = utils.encryptText(decryptedToken)

    resp = make_response(os.path.join(BUILD_PATH, 'index.html'))
    resp.set_cookie('sessionToken', encryptedToken)

    curr.execute('INSERT INTO usuarios_auth (id_usuario, auth_token) VALUES (%s, %s)', [data[0], encryptedToken])
    conn.commit()
    return resp

@app.route('/api/deslogar_usuario')
def deslogar_usuario():
    args = request.args
    try:
        email = args['email']
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    # TODO: finish auth



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if os.path.exists(path):
        return send_file(path)
    return send_file(os.path.join(BUILD_PATH, "index.html"))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True, threaded=True)