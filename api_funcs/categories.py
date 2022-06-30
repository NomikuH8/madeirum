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

def get_category(conn, curr):
    name = ''
    try:
        name = request.args['categoria']
    except:
        return { 'help': 'missing categoria', 'success': False }
    
    curr.execute('SELECT * FROM categorias WHERE nome_categoria = %s', [name])

    raw_data = []
    try:
        raw_data = curr.fetchone()
    except:
        return { 'help': 'categoria not found', 'success': False }
    
    return {
        'id': raw_data[0],
        'nome_categoria': raw_data[1],
        'foto_categoria': raw_data[2]
    }


def get_lanches(conn, curr):
    category = get_category(conn, curr)

    curr.execute('SELECT * FROM produtos WHERE id_categoria = %s', [category['id']])

    raw_data = []
    try:
        raw_data = curr.fetchall()
    except:
        return { 'help': 'a problem occured fetching lanches', 'success': False }
    
    data = []
    for i in raw_data:
        data.append({
            'id_produto': i[0],
            'nome_produto': i[1],
            'descricao_produto': i[2],
            'preco_produto': i[3],
            'foto_produto': i[4],
        })
    
    return jsonify({
        'categoria': category,
        'lanches': data
    })


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
    from_name = ''
    to_name = ''
    path = ''

    uploaded_img = {}

    try:
        uploaded_img = request.files['foto']
    except:
        uploaded_img['filename'] = ''

    if type(uploaded_img) != dict:
        if uploaded_img.filename != '':
            path = 'images/categories/' + to_name + '.' + uploaded_img.filename.split('.')[1]
            uploaded_img.save(path)

    curr.execute('SELECT id_categoria, foto_categoria FROM categorias WHERE nome_categoria = %s', [from_name])

    row_id = None
    try:
        data = curr.fetchone()
        row_id = data[0]
        if path != '' and path != data[1]:
            os.remove(data[1])
    except:
        return { 'help': 'row id not found', 'success': False }

    curr.execute('UPDATE categorias SET foto_categoria = %s, nome_categoria = %s WHERE id_categoria = %s', [
        path, to_name, row_id
    ])
    conn.commit()

    return { 'success': True }


def del_category(conn, curr):
    # todo: check authorization
    pass