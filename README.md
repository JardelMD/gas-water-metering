# Water and Gas Metering System

Este projeto implementa um sistema de gerenciamento de leitura individualizada de consumo de água e gás, utilizando inteligência artificial para obter a medição através de fotos dos medidores. O back-end foi desenvolvido utilizando Node.js, TypeScript, PostgreSQL, Prisma e Docker.

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada da seguinte maneira:

```
gas-water-metering/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── measure.controller.ts
│   ├── database/
│   │   └── database.ts
│   ├── middleware/
│   │   └── validateRequest.middleware.ts
│   ├── routes/
│   │   └── measure.routes.ts
│   ├── services/
│   │   ├── gemini.service.ts
│   │   └── measure.service.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
## Configuração do Ambiente

### Pré-requisitos

- Node.js
- Docker e Docker Compose
- PostgreSQL

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://user:password@localhost:5432/your_database?schema=public"
PORT=3000
GEMINI_API_KEY=<your_key_api_gemini>
```

### Instalação e Execução

1. **Instalar dependências**:

```bash
   npm install
```
2. **Migrar o banco de dados**:

```bash
    npm run prisma:migrate
```
3. **Gerar o cliente do Prisma**:

```bash
    npm run prisma:generate
```
4. **Executar o projeto**:

    **Para desenvolvimento**:
    ```bash
        npm run dev
    ```
    **Para produção**:
    ```bash
        npm run build
        npm start
    ```
    **Executar com Docker**:

    ```bash
        docker-compose up --build
    ```
    
## Funcionalidades Principais

### Endpoints

- **POST /measure/upload**: Recebe uma imagem de um medidor, juntamente com informações sobre o cliente, data/hora e tipo de medição. Utiliza o Google Gemini para processar a imagem e extrair o valor da medição.

- **PATCH /measure/confirm**: Confirma o valor da medição extraído anteriormente, permitindo ajustes manuais caso necessário.

- **GET /measure/:customer_code/list**: Lista todas as medições realizadas para um cliente específico, com filtro opcional pelo tipo de medição (água ou gás).

## Tecnologias Utilizadas

- **Node.js** e **TypeScript**: Para o desenvolvimento do servidor e da lógica de negócios.
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL.
- **Docker**: Para facilitar a configuração e execução do ambiente de desenvolvimento e produção.
- **Google Gemini API**: Para análise e extração de valores de medição a partir de imagens.

