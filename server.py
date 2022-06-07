from dotenv import dotenv_values

from flask import render_template
from flask import make_response
from flask import send_file
from flask import request
from flask import Flask
import psycopg2
import random
import bcrypt
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
            nome VARCHAR NOT NULL,
            email VARCHAR NOT NULL UNIQUE,
            senha VARCHAR NOT NULL,
            tipo_conta VARCHAR NOT NULL,
            endereco VARCHAR
        );
    ''',
    'usuarios_auth': '''
    CREATE TABLE
        IF NOT EXISTS usuarios_auth (
            id_token BIGSERIAL PRIMARY KEY,
            id_usuario INTEGER NOT NULL,
            auth_token VARCHAR NOT NULL UNIQUE
        );
    ''',
    'categorias': '''
    CREATE TABLE
        IF NOT EXISTS categorias (
            id_categoria SERIAL PRIMARY KEY,
            nome_categoria VARCHAR,
            foto_categoria VARCHAR
        );
    ''',
    'produtos': '''
    CREATE TABLE
        IF NOT EXISTS produtos (
            id_produto SERIAL PRIMARY KEY,
            nome_produto VARCHAR NOT NULL,
            descricao_produto VARCHAR,
            preco_produto FLOAT8 NOT NULL,
            foto_produto VARCHAR,
            id_categoria INTEGER NOT NULL
        );
    ''',
    'pedidos': '''
    CREATE TABLE
        IF NOT EXISTS pedidos (
            id_pedido SERIAL PRIMARY KEY,
            id_usuario INTEGER NOT NULL,
            entregue BOOLEAN NOT NULL
        );
    ''',
    'produtos_pedidos': '''
    CREATE TABLE
        IF NOT EXISTS produtos_pedidos (
            id_prod_pedido SERIAL PRIMARY KEY,
            id_pedido INTEGER NOT NULL,
            id_produto INTEGER NOT NULL,
            quantidade INTEGER NOT NULL,
            observacoes VARCHAR
        );
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
    token = ''
    try:
        token = args['access_token']
    except:
        return { 'help': 'missing arguments', 'success': False }

    curr.execute('SELECT id_usuario FROM usuarios_auth WHERE auth_token=%s', [token])

    id_user = ''
    try:
        data = curr.fetchone()
        id_user = data[0]
    except:
        return { 'help': 'userid  not found', 'success': False}
        
    curr.execute("SELECT id_usuario, nome, email, tipo_conta FROM usuarios WHERE id_usuario=%s", [id_user])
    data = []
    ret = {}

    try:
        data = curr.fetchone()
        ret = {
            'id': data[0],
            'nome': data[1],
            'email': data[2],
            'tipo_conta': data[3]
        }
    except:
        ret = { 'help': 'user not found', 'success': False}

    return ret


@app.route('/api/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    args = request.args

    nome = ''
    email = ''
    senha = ''
    try:
        nome = args['nome']
        email = args['email']
        senha = utils.encrypt_password(args['senha'])
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    curr.execute("SELECT email FROM usuarios WHERE email=%s", [email])
    data = []
    try:
        data = curr.fetchall()[0]
        if len(data) > 0:
            return { 'help': 'email already used', 'success': False }
    except:
        try:
            curr.execute("INSERT INTO usuarios (nome, email, senha, tipo_conta) VALUES (%s, %s, %s, %s)", [nome, email, senha, 'normal'])
            conn.commit()
            return { 'success': True }
        except:
            conn.rollback()
            return { 'success': False }


@app.route('/api/logar_usuario', methods=['POST'])
def logar_usuario():
    args = request.args 

    email = ''
    senha = ''

    try:
        email = args['email']
        senha = args['senha']
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    curr.execute('SELECT id_usuario, nome, email, senha FROM usuarios WHERE email=%s', [email])
    data = []
    try:
        data = curr.fetchall()[0]
    except:
        return { 'help': 'user not found', 'success': False }
    
    
    if not utils.check_password(senha, data[3]):
        return { 'help': 'wrong password', 'success': False }

    
    curr.execute('DELETE FROM usuarios_auth WHERE id_usuario = %s', [data[0]])
    
    conta_dict = {
        'id_usuario': data[0],
        'nome': data[1],
        'email': data[2],
        'senha': data[3]
    }
    token = utils.get_token(conta_dict)
    
    curr.execute('INSERT INTO usuarios_auth (id_usuario, auth_token) VALUES (%s, %s)', [data[0], token])
    conn.commit()
    return {
        'token': token,
        'success': True
    }


@app.route('/api/deslogar_usuario', methods=['POST'])
def deslogar_usuario():
    args = request.args
    try:
        token = args['access_token']
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    curr.execute('DELETE FROM usuarios_auth WHERE auth_token = %s', [token])
    conn.commit()
    return { 'success': True }




@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if os.path.exists(path):
        return send_file(path)
    return send_file(os.path.join(BUILD_PATH, "index.html"))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True, threaded=True)