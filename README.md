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
## Tecnologias Utilizadas

- **Node.js** e **TypeScript**: Para o desenvolvimento do servidor e da lógica de negócios.
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL.
- **Docker**: Para facilitar a configuração e execução do ambiente de desenvolvimento e produção.
- **Google Gemini API**: Para análise e extração de valores de medição a partir de imagens.
-
## Configuração do Ambiente

### Pré-requisitos

- Node.js
- TypeScript
- Docker e Docker Compose
- PostgreSQL
- Prisma

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://user:password@localhost:5432/your_database?schema=public"
GEMINI_API_KEY=<your_key_api_gemini>
PORT=3000
```

### Instalação e Execução

1. **Instalar dependências**:

```bash
   npm install
```
2. **Migrar o banco de dados e gerar o cliente do Prisma**:

```bash
    npm run prisma:migrate
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

- **POST /api/upload**: Recebe uma imagem de um medidor, juntamente com informações sobre o cliente, data/hora e tipo de medição. Utiliza o Google Gemini para processar a imagem e extrair o valor da medição.

Padrão de corpo:
```json
{
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER"
}
```

Padrão de resposta (STATUS: 200)
```json
{
    "image_url": "string",
    "measure_value": 123,
    "measure_uuid": "string"
}
```

Padrão de resposta (STATUS: 400)
```json
{
    "error_code": "INVALID_DATA",
    "error_description": "<descrição do erro>"
}
```

Padrão de resposta (STATUS: 409)
```json
{
    "error_code": "DOUBLE_REPORT",
    "error_description": "Leitura do mês já realizada"
}
```

- **PATCH /api/confirm**: Confirma o valor da medição extraído anteriormente, permitindo ajustes manuais caso necessário.

Padrão de corpo:
```json
{
    "measure_uuid": "string",
    "confirmed_value": 123
}
```

Padrão de resposta (STATUS: 200)
```json
{
    "success": true
}
```

Padrão de resposta (STATUS: 400)
```json
{
    "error_code": "INVALID_DATA",
    "error_description": "<descrição do erro>"
}
```
Padrão de resposta (STATUS: 404)
```json
{
    "error_code": "MEASURE_NOT_FOUND",
    "error_description": "Leitura do mês já realizada"
}
```

Padrão de resposta (STATUS: 409)
```json
{
    "error_code": "CONFIRMATION_DUPLICATE",
    "error_description": "Leitura do mês já realizada"
}
```

- **GET /api/:customer_code/list**: Lista todas as medições realizadas para um cliente específico, com filtro opcional pelo tipo de medição (água ou gás). Exemplo de filtro: **{base url}/<customer_code>/list?measure_type=WATER.**

Padrão de corpo:

No body


Padrão de resposta (STATUS: 200)
```json
{
    "customer_code": "string",
    "measures": [
        {
            "measure_uuid": "string",
            "measure_datetime": "datetime",
            "measure_type": "string",
            "has_confirmed": true,
            "image_url": "string"
        },
        {
            "measure_uuid": "string",
            "measure_datetime": "datetime",
            "measure_type": "string",
            "has_confirmed": false,
            "image_url": "string"
        }
    ]
}
```

Padrão de resposta (STATUS: 400)
```json
{
    "error_code": "INVALID_TYPE",
    "error_description": "Tipo de medição não permitida"
}
```
Padrão de resposta (STATUS: 404)
```json
{
    "error_code": "MEASURES_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
}
```

