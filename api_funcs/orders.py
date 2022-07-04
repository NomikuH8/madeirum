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

    new_data = list(data)
    newer_data = []
    for i in new_data:
        newer_data.append([
            i[0],
            i[1].strftime('%d/%m/%Y %H:%M')
        ])

    return jsonify(newer_data)


def confirm_order(conn, curr):
    token = ''
    body = []

    try:
        token = request.cookies['access-token']
        body = request.json
    except:
        return { 'help': 'missing cookie or body', 'success': False}
    
    curr.execute('SELECT id_usuario FROM usuarios_auth WHERE auth_token=%s', [token])

    id_usuario = -1
    try:
        id_usuario = curr.fetchone()[0]
    except:
        return { 'help': 'token not found', 'success': False }

    # TODO: fix to new database
    curr.execute('INSERT INTO pedidos (id_usuario) VALUES (%s) RETURNING id_pedido', [id_usuario])

    id_pedido = -1
    try:
        id_pedido = curr.fetchone()[0]
    except:
        return { 'help': 'could not insert pedido', 'success': False }
    
    for i in body:
        curr.execute('''INSERT INTO 
                        produtos_pedidos (id_pedido, id_produto, quantidade, observacoes)
                        VALUES (%s, %s, %s, %s)''',
                        [id_pedido, i['id_produto'], i['quantity'], i['observation']])
    
    conn.commit()

    return { 'help': 'successfully made pedido', 'success': True }
