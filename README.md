# Points of Interest (POI) Management API

This project implements a CRUD service to manage Points of Interest (POIs), specifically focusing on petrol stations. It includes details such as operational status, location, fuel pumps, and products available.

## Features
- Create, Read, Update, and Delete POIs.
- Manage petrol station details such as status, location, pumps, and opening hours.

## Technologies Used
- **NestJS**: A progressive Node.js framework.
- **TypeORM**: ORM for working with databases.
- **PostgreSQL**: Database for storing POI data.

## Prerequisites
- Node.js (v20 or higher)
- PostgreSQL
- Postman (for testing the API)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kashan-samad/manage-poi-coding-challenge.git
cd manage-poi-coding-challenge
```

### 2. Install dependencies

```bash
$ npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of the project and configure the database connection settings:

```
DB_HOST=localhost
DB_PORT=5432
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_NAME=poi
```

### 4. Database Setup
Make sure PostgreSQL is installed and running. Run the following commands to set up the database:
```
psql -U postgres
CREATE DATABASE poi;
```

### 5. Run Migrations (if applicable)
If the project uses migrations, run:

```
npx ts-node scripts/seed.ts
```

### 6. Start the Application
To start the application, run:

```
npm run start:dev
```

This will start the API on http://localhost:3000. You can now test the API using Postman.

### 7. Testing the API
Import the Postman Collection `POI.postman_collection.json`:
Import the collection into Postman.
Make sure to configure any required environment variables (e.g., BASE_URL).
Example Requests:

```
Get All POIs: GET /poi
Get Specific POIs: GET /poi/:id
Create POI: POST /poi
Update POI: PUT /poi/:id
Delete POI: DELETE /poi/:id
```

### License
This project is licensed under the MIT License.

## Suggested Improvements and Architectural Considerations

### Tight coupling with petrol pumps
The current schema is tightly coupled with petrol pumps. To make it more flexible for other POIs like cafes, pubs, etc., the schema can be redesigned in a more generic way to support different types of POIs.

### API Endpoints
Implement versioning from the beginning (e.g., /api/v1/poi) to handle updates without breaking existing clients.

### Error Handling
Standardize error responses across all endpoints. Use HTTP status codes correctly (e.g., 400 for bad requests, 404 for not found, 500 for internal server errors). This will provide better feedback to clients consuming the API.

### Security Considerations
The API currently lacks authentication and authorization. Implementing JWT-based authentication will secure sensitive endpoints (e.g., creating or deleting POIs). You can use a package like passport-jwt to manage authentication.

### Logging and Monitoring
Utilize a logging package like Winston to enable structured logging. Logs should capture metadata, including request IDs, timestamps, and user information (if authenticated), which will simplify debugging and tracking requests.

### Scalability
Implement caching strategies, such as Redis, to store frequently accessed data like POI details that remain unchanged. This can help reduce database load and improve response times.
