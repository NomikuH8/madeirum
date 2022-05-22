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
        return args

    curr.execute(f"SELECT id_usuario, nome, email FROM usuarios WHERE email='{email}'")
    data = []
    ret = {}

    try:
        data = curr.fetchall()[0]

        ret = {
            'id': data[0],
            'nome': data[1],
            'email': data[2],
        }
    except:
        return ret

    return ret


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True, threaded=True)