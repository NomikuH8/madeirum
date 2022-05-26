-- All tables
CREATE TABLE
  IF NOT EXISTS usuarios (
    id_usuario BIGSERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    senha VARCHAR NOT NULL,
    tipo_conta VARCHAR NOT NULL,
    endereco VARCHAR
  );

CREATE TABLE
  IF NOT EXISTS usuario_auth (
    id_token SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    auth_token VARCHAR NOT NULL UNIQUE
  );

CREATE TABLE
  IF NOT EXISTS categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome_categoria VARCHAR,
    foto_categoria VARCHAR
  );

CREATE TABLE
  IF NOT EXISTS produtos (
    id_produto SERIAL PRIMARY KEY,
    nome_produto VARCHAR NOT NULL,
    descricao_produto VARCHAR,
    preco_produto FLOAT8 NOT NULL,
    foto_produto VARCHAR,
    id_categoria INTEGER NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    entregue BOOLEAN NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS produtos_pedidos (
    id_prod_pedido SERIAL PRIMARY KEY,
    id_pedido INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    observacoes VARCHAR
  );