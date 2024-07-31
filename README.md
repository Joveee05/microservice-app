# Microservice-Based Application

## Architecture Decisions

### MVC Pattern

- **Model**: Represents the data and business logic.
- **View**: Not implemented as JSON responses are used.
- **Controller**: Handles incoming requests, processes them using the model, and returns the response.

### TypeScript

- Ensures type safety and better code quality.
- Helps in identifying potential issues during development.

### Microservices

- **User Service**: Manages user data.
- **Auth Service**: Manages authentication.
- **Product Service**: Manages product data.
- Services communicate using RESTful APIs.

### Caching

- Redis is used to cache frequently accessed data to improve performance.

## How to Run

### Prerequisites

- Node.js
- MongoDB
- Redis

## Steps

1. Clone the repository to your local machine using the following command:

   ```
   git clone https://github.com/Joveee05/microservice-app.git
   ```

2. Change directory into each service:

   ```
   cd user-service

   ```

3. Run the following command to install the necessary dependencies for the service:

   ```
   npm install
   ```

4. Repeat the same process for each service in the repository.
