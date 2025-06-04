
# API Minitok (Node.JS com NestJS)

Esse projeto foi desenvolvido para a Minitok com o intuito de ser uma API Rest simples e apenas para nivelamento de conhecimento técnico.

## Endpoints

A API dispõe de apenas uma funcionalidade que é o CRUD de usuários.

Você pode verificar os endpoints clicando no seguinte link [Documentação da API](https://localhost:3000/api).

## Como configurar o projeto em sua máquina local

Para que o projeto funcione corretamente na sua máquina local, você deve seguir os seguintes passos abaixo:

- Baixe e instale o Docker em sua máquina, para isso você pode seguir a documentação oficial aqui -> [Configuração do Docker](https://docs.docker.com/desktop/).
- Clone o projeto que está versionado no seguinte repositório do GITHUB -> [Clonar repositório](https://github.com/kauanfrodrigues98/minitok_api).
- Abra o terminal e navegue até a raiz do projeto que foi clonado e execute o seguinte comando `docker-compose up --build`.
- O Docker começará a buildar o projeto para você e automaticamente inicia-lo, deixando-o disponível no seguinte link [http://localhost:3000/api](http://localhost:3000/api).
- Para que você tenha acesso externo aos endpoints você pode usar o [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/).
- Foi feita uma documentação simples no Postman apenas para fins de complemento da documentação principal que foi feita usando o Swagger. Para acessar a documentação no Postman basta clicar no link [Documentação da API no Postman](https://documenter.getpostman.com/view/13172288/2sB2qi8xVz).

## Tecnologias utilizadas

NestJS - Framework para desenvolvimento de aplicações Node.

Docker - Tecnologia de conteinerização.

NodeJS - 23-alpine - Linguagem utilizada e sua versão.

MongoDB - Banco de dados não relacional.

## Bibliotecas

Swagger - Documentação de API.

Jest - Testes unitários.

## Autores

- [@kauanfrodrigues98](https://www.github.com/kauanfrodrigues98)
- [Portifolio Online](https://kauan-rodrigues.vercel.app)

