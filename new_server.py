from dotenv import dotenv_values

import api_funcs.categories as categories
import api_funcs.users as users
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
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 10
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
            nome_categoria VARCHAR UNIQUE,
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



# ------------------ conexao ------------------ #

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


# ------------------ usuarios ------------------ #

@app.route('/api/get_usuario')
def get_usuario():
    return users.get_usuario(conn, curr)

@app.route('/api/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    return users.cadastrar_usuario(conn, curr)

@app.route('/api/logar_usuario', methods=['POST'])
def logar_usuario():
    return users.logar_usuario(conn, curr)

@app.route('/api/deslogar_usuario', methods=['POST'])
def deslogar_usuario():
    return users.deslogar_usuario(conn, curr)


# ----------------- categorias ----------------- #

@app.route('/api/get_categorias')
def get_categorias():
    return categories.get_categories(conn, curr)

@app.route('/api/get_lanches')
def get_lanches():
    return categories.get_lanches(conn, curr)

@app.route('/api/add_categorias', methods=['POST'])
def add_categorias():
    return categories.add_category(conn, curr)

@app.route('/api/change_categorias', methods=['POST'])
def change_categorias():
    return categories.change_category(conn, curr)

@app.route('/api/change_photo_categorias', methods=['POST'])
def change_photo_categorias():
    return categories.receive_image(conn, curr)

@app.route('/api/delete_categorias', methods=['POST'])
def del_categorias():
    return categories.del_category(conn, curr)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if os.path.exists(path):
        return send_file(path)
    return send_file(os.path.join(BUILD_PATH, "index.html"))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True, threaded=True)