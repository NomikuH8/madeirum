from flask import jsonify
from flask import request
import os

def get_orders(conn, curr):
    token = ''

    try:
        token = request.cookies['access-token']
    except:
        return { 'help': 'missing cookie', 'success': False }
    
    curr.execute('SELECT id_usuario FROM usuarios_auth WHERE auth_token=%s', [token])

    id_usuario = 0
    try:
        id_usuario = curr.fetchone()[0]
    except:
        return { 'help': 'token not found', 'success': False }
    
    curr.execute('SELECT id_pedido, datetime FROM pedidos WHERE id_usuario=%s', [id_usuario])

    data = []
    try:
        data = curr.fetchall()
    except:
        return { 'help': 'could not fetch data', 'success': False }
    
    if len(data) == 0:
        return {}

    return jsonify(data)


def confirm_order(conn, curr):
    token = ''

    try:
        token = request.cookies['access-token']
    except:
        return { 'help': 'missing cookie', 'success': False}
    
