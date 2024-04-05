
# Discoteca - Tião Carreiro e Pardinho

O projeto Discoteca consiste numa apresentação de albuns da banda Tião Carreiro e Pardinho.


## Instruções de instalação

Para instalar e rodar corretamente o projeto, deverá executar os seguintes comandos em seu terminal

1 - clone este repositório
```bash
git clone https://github.com/Antony-Oliveira/Discoteca.git
cd Discoteca
```

2 - Instalação de pacotes composer
```bash
composer install
```
3 - Configurações do .env
```bash
cp .env.example .env
php artisan generate
```

4 - Configurar migrations (banco de dados)
```bash
php artisan migrate
```
observação: o banco de dados será a partir de um arquivo sqlite, portando, quando o comando deste passo pedir, confirme com yes.

5 - Criação de link simbólico entre public/ e storage/public
```bash
php artisan storage:link
```

6 - Rodar servidor php
```bash
php artisan serve
```

## Comandos para o front end

Agora, abra uma nova aba de terminal e execute os seguintes comandos:

1 - Entrar na pasta client do projeto

```bash
cd client-discoteca
```

2 - Instalar pacotes e dependências
```bash
npm install
```

3 - Rodar servidor do client

```bash
npm run dev
```
## Conclusão

Pronto! Agora é só acessar [http://localhost:3000](http://localhost:3000) e testar o projeto :D

## Funcionalidades

#### Raíz ( / )
Logo na rota principal do cliente, é possivel visualizar albums em cards, pesquisa-los por nome,criar um novo, excluir, e obter mais informações sobre o album.

#### Detalhes do album ( /album/{id} )
Aqui é possível ver informações adicionais que não estão presentes na raíz, como descrição do album, suas músicas.
Além disso, aqui também é possível excluir e adicionar músicas, como também pesquisar por nome.
## Recursos

### Stack

O projeto usa a stack Laravel + React, sendo servidor e client respectivamente. Ambos se conectam atráves de rotas API definidas no Laravel, que processam informações enviadas pelo React.

### UI

O projeto usa a biblioteca NextUI, auxiliando com componentes pré estilizados, facilitando o desenvolvimento das páginas.

### Autenticação
#### CORS

O servidor irá apenas aceitar solicitações de uma fonte definida na váriavel de ambiente FRONTEND_URL, no .env. Assim, apenas requisições vindas da aplicação serão aceitas, independente de middlewares.

#### Rotas livres

As rotas /login, /register, /albums e /album{album}, presentes no arquivo de definições de rotas pra api api.php, são livres, ou seja, sem middlewares.

#### Rotas protegidas
As rotas /track/add, /track/{track}/delete, /album/{album}/delete, /album/add e /user/{user}/logout são rotas protegidas pelo middleware auth:sanctum, fazendo com que essas rotas apenas são aceitas caso esteja presente no header da requisição um Bearer token, que será fornecido apenas após um login bem sucedido na rota /login.

## Requests

A validação dos dados é feita por meio dos Requests do Laravel, ou seja, caso tenha algum erro com os dados fornecidos pelo cliente, no próprio Request isso será tratado, dessa forma, o Controller apenas se encarrega de executar sua função, sem se preocupar com os erros de validação.

