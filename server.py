from dotenv import dotenv_values
from flask import request
from flask import Flask
import psycopg2
import sys

PORT = 5000

app = Flask(__name__)
config = dotenv_values('.env')

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



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True, threaded=True)