from flask import request
import utils

def get_usuario(conn, curr):
    token = ''
    try:
        token = request.cookies['access-token']
    except:
        return { 'help': 'not able to get token', 'success': False }
    
    # if not utils.is_token_valid(token):
    #     deslogar_usuario(conn, curr)
    #     return { 'help': 'token expired', 'success': False }

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
  

def cadastrar_usuario(conn, curr):
    nome = ''
    email = ''
    senha = ''

    body = request.json
    try:
        nome = body['nome']
        email = body['email']
        senha = utils.encrypt_password(body['senha'])
    except:
        return { 'help': 'not able to get request body', 'success': False }
    
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


def logar_usuario(conn, curr):
    email = ''
    senha = ''

    body = request.json
    try:
        email = body['email']
        senha = body['senha']
    except:
        return { 'help': 'not able to get request body', 'success': False }
    
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


def deslogar_usuario(conn, curr):
    try:
        token = request.cookies['access-token']
    except:
        return { 'help': 'missing arguments', 'success': False }
    
    curr.execute('DELETE FROM usuarios_auth WHERE auth_token = %s', [token])
    conn.commit()
    return { 'success': True }