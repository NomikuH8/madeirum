import api_funcs.users as users
from flask import jsonify
from flask import request
import os

def get_categories(conn, curr):
    curr.execute('SELECT * FROM categorias')

    raw_data = []
    try:
        raw_data = curr.fetchall()
    except:
        return { 'help': 'no category', 'success': False }

    data = []
    for i in raw_data:
        data.append({
            'id': i[0],
            'nome_categoria': i[1],
            'foto_categoria': i[2]
        })
    
    return jsonify(data)

def add_category(conn, curr):
    # todo: check authorization
    name = ''
    uploaded_img = {}

    try:
        name = request.args['nome_categoria'].lower()
    except:
        return { 'help': 'missing name', 'success': False}
    
    try:
        uploaded_img = request.files['foto']
    except:
        uploaded_img['filename'] = ''

    path = ''
    if type(uploaded_img) != dict:
        if uploaded_img.filename != '':
            path = 'images/categories/' + name + '.' + uploaded_img.filename.split('.')[1]
            uploaded_img.save(path)


    curr.execute('INSERT INTO categorias (nome_categoria, foto_categoria) VALUES (%s, %s)', [
        name, path
    ])
    conn.commit()

    return { 'success': True }


def change_category(conn, curr):
    # todo: check authorization
    # todo: finish this
    from_name = ''
    to_name = ''

    curr.execute('SELECT id_categoria FROM categorias WHERE nome_categoria = %s', [from_name])

    row_id
    try:
        row_id = curr.fetchone()[0]
    except:
        return { 'help': 'category does not exist', 'success': False }

    curr.execute('UPDATE categorias SET foto_categoria = %s WHERE nome_categoria = %s')

def del_category(conn, curr):
    # todo: check authorization
    pass