# Driven-Shortly-API 🩳
Projeto _back-end_ para construção de uma aplicação de um sistema encurtador de URLs.
## Requisitos Obrigatórios ⚠️

### Geral:
- **Deploy do projeto back-end e do banco de dados na nuvem**.
- Utilização do banco de dados PostgreSQL.
- Arquiteturar o projeto em _controllers_, _routers_, _middlewares_ e _schemas_.
- Validação de dados utilizando a dependência _joi_.
- _dump SQL_
- _Repository Pattern_

### Armazenamento dos Dados:

- Formato geral dos dados:

``` sql
"users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

"sessions" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
  "token" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

"urls" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
  "url" TEXT NOT NULL,
  "shortUrl" TEXT NOT NULL,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
```

- _payload_ da requisição:

``` jsx

signUp = {
  name: "João",
  email: "joao@driven.com.br",
  password: "driven",
  confirmPassword: "driven"
}

signIn = {
  email: "joao@driven.com.br",
  password: "driven"
}

urlShorten = {
  url: "https://..."
}

```

## Entrypoints ⚙️
### 🚩 AuthRoute 🚩
### /signup
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **name, email, password** e **confirmPassword** pelo _body_ e realiza o cadastro do usuário.<br>
### /signin
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **email** e **password** pelo _body_ e realiza o login do usuário.
### /logout
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **token** pelo _header_ e realiza o logout do usuário.
<br>
### 🚩 UrlRoute 🚩
### /urls/:id
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna uma URL por ID.<br>
![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) Recebe **token** pelo _header_ e deleta uma URL por ID.
### /urls/shorten
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **url** pelo _body_, **token** pelo _header_ e cria nova URL (encurtada).
### /urls/open/:shortUrl
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Incrementa a quantidade de visitantes da URL encurtada e redireciona o usuário para a URL destinada.
<br>
### 🚩 UserRoute 🚩
### /ranking
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna lista dos 10 usuários mais bem ranqueados do sistema.
### /users/me
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna lista das URLS encurtadas criadas pelo usuário.
<br>
## Middlewares 🔛

### schemaValidation & dataSanitization:
- Recebe um _Schema_ por parámetro de função e realiza as verificações dos dados recebidos pelo _body_ e _params_.
- Realiza a sanitização dos dados.
- Rotas que utilizam esses _middlewares_:
  - **AuthRoute**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/signup**
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/signin** 
  - **UrlRoute**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/urls/shorten**

### authValidation:
- Recebe um **token** pelo _header_ e verifica se o **token** é válido e se o usuário está autentificado no sistema.
- Rotas que utilizam esse _middleware_:
  - **AuthRoute**
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/logout**
  - **UrlRoute**:
    - ![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) **/urls/:id** 
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/urls/shorten**
  - **UserRoute**:
    - ![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) **/users/me**

## Deploy Front-End do Projeto 💻

| Plataforma | Deploy |
| --- | --- |
| <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a> | https://driven-shortly.vercel.app/
