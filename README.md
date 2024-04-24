# World Countries

## Introduction

World Countries is a web application that utilizes NextJS, TypeScript, and Styled-Components to display an interactive map showcasing country data fetched from a public GraphQL endpoint. The application is designed to be simple yet performant, with a focus on front-end engineering best practices.

## Features

- Interactive map that displays information about countries.
- Fetches data from a GraphQL endpoint: https://countries.trevorblades.com/
- Utilizes MapBox.

## Prerequisites

- Node.js (Version 20.x)
- npm (Comes with Node.js)
- Docker (Optional, for containerization)

## Installation

### Running Locally

To run the application locally:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd reprisk-map
   ```

2. Configure MapBox

   - Create a `.env` file, you can take as example `.env.example`
   - The env variable should be called `NEXT_PUBLIC_MAPBOX_TOKEN`

3. Run the project in dev mode:

   1. **Locally with Node:**

      - Install dependencies:
        ```bash
        npm install
        ```
      - Start the development server:
        ```bash
        npm run dev
        ```
      - The application will be available at http://localhost:3000.

   2. **With Docker:**

      - Make sure Docker is installed and running.
      - Start the application using Docker Compose:
        ```bash
        docker-compose up --build
        ```
      - The application will also be available at http://localhost:3000.

4. Run the project in production mode:

   1. **Locally with Node:**
      - Install dependencies:
        ```bash
        npm install
        ```
      - Build the project
        ```bash
        npm run build
        ```
      - Run the project
        ```bash
        npm start
        ```
   2. **With Docker:**
      - Make sure Docker is installed and running.
      - Start the application using Docker Compose:
        ```bash
        docker-compose -f docker-compose.prod.yml up --build
        ```
      - The application will also be available at http://localhost:3000.

## Testing

To run tests, execute the following command:

```bash
npm run test
```
