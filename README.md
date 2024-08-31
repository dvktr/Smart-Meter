# SmartMeter

## Descrição

**SmartMeter** é um projeto backend desenvolvido em NestJS que gerencia a leitura individualizada de consumo de água e gás. O serviço utiliza IA para obter medições a partir de imagens de medidores e armazena essas leituras em um banco de dados PostgreSQL.

## Tecnologias Utilizadas

- **NestJS**: ^10.0.0.
- **TypeScript**: ^5.1.3.
- **TypeORM**: ^0.3.20.
- **PostgreSQL**: postgres:13.
- **Google Generative AI**: ^0.17.1.

## Funcionalidades

- **Upload de Leitura**: Recebe uma imagem de um medidor e retorna a leitura extraída pela IA.
- **Confirmação de Leitura**: Permite confirmar ou corrigir o valor lido pela IA.
- **Listagem de Leituras**: Lista todas as leituras realizadas por um cliente, com filtros opcionais para tipos de leitura (água/gás).

## Instalação (Com Docker)

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/smartmeter.git
   cd smartmeter
   ```

 2. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```bash
   GEMINI_API_KEY=sua-chave-api
   ```

3. Rode o container:

   ```bash
   docker-compose up --build -d
   ```

   O projeto estará disponível em `http://127.0.0.1:5000`.

## Instalação (Sem Docker)

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/smartmeter.git
   cd smartmeter
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```bash
   PORT=5000
   MODE=DEV

   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=seu-usuario
   POSTGRES_PASSWORD=sua-senha
   POSTGRES_DATABASE=sm_db

   GEMINI_API_KEY=sua-chave-api
   ```

4. Configure o banco de dados:

   Certifique-se de que o PostgreSQL está rodando e crie um banco de dados com o mesmo nome da variável "POSTGRES_DATABASE"

5. Execute o projeto:

   ```bash
   npm run start:dev
   ```

   O projeto estará disponível em `http://localhost:5000`.

## Uso

### Endpoints

## Para facilitar o uso, há uma migração de inserção de um customer, essas são as informações de acesso dele:
```json
{
  id: 1,
  name: Teste,
  created_at: "2024-08-30",
  code: "e3a9de1c-ab52-446c-a208-aa377ddf1f5c"
}
```

## Também para facilitar, aqui está uma collection do postman:
[Smart Meter.postman_collection.json](https://github.com/user-attachments/files/16823088/Smart.Meter.postman_collection.json)


1. **Upload de Leitura**

   - **POST** `/upload`
   - Recebe uma imagem de um medidor e retorna a leitura extraída pela IA.
   - **Body:**

     ```json
     {
       "image": "base64string",
       "customer_code": "e3a9de1c-ab52-446c-a208-aa377ddf1f5c",
       "measure_datetime": "2024-08-29",
       "measure_type": "WATER"
     }
     ```

   - **Response:**

     ```json
     {
       "measure_uuid": "uuid-1234",
       "image_url": "https://example.com/temp/uuid-1234",
       "measure_value": 28.88
     }
     ```

2. **Confirmação de Leitura**

   - **PATCH** `/confirm`
   - Confirma ou corrige a leitura extraída pela IA.
   - **Body:**

     ```json
     {
       "measureUuid": "uuid-1234",
       "confirmedValue": 28.88
     }
     ```

   - **Response:**

     ```json
     {
       "success": true
     }
     ```

3. **Listagem de Leituras**

   - **GET** `/:uuid/list`
   - Lista todas as leituras realizadas por um cliente.
   - **Query Params:**
     - `measure_type`: (Opcional) Filtra por tipo de medição (`WATER` ou `GAS`).
     - `orderBy`: (Opcional) Ordena os resultados pelo campo especificado (`value` ou `confirmed`).
     - `orderDirection`: (Opcional) Direção da ordenação (`ASC` ou `DESC`).

   - **Response:**

     ```json
     {
       "customer_code": "CUST123",
       "measures": [
         {
           "measure_uuid": "uuid-1234",
           "measure_datetime": "2024-08-29T14:30:00Z",
           "measure_type": "WATER",
           "confirmed": true,
           "image_url": "https://example.com/temp/uuid-1234"
         }
       ]
     }
     ```

## Contato

- **Nome**: Victor Mendes de Souza
- **Email**: victormendes04012004@gmail.com
- **LinkedIn**: [Meu-Linkedin](https://www.linkedin.com/in/viktormnds/)
