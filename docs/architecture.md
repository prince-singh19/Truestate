# Architecture Document

**Project:** Truestate - Retail Sales Management  
**Document Location:** `/docs/architecture.md`  
**Author:** Prince Singh  
**Date:** 2025-12-06

---

## 1. Backend Architecture

The backend is built with **Node.js**, **Express.js**, and **MongoDB**.  

**Components:**

- **Server (Express.js)**: Handles HTTP requests from the frontend.  
- **Controllers**: Manage business logic for endpoints (e.g., sales transactions, users).  
- **Models (Mongoose)**: Define MongoDB schemas and interact with the database.  
- **Routes**: Map HTTP endpoints to controllers.  
- **Middleware**: Includes authentication, error handling, and logging.  
- **Environment Config**: `.env` file stores sensitive information like `MONGO_URI`.

**Flow:**


---

## 2. Frontend Architecture

The frontend is built with **React**, **Tailwind CSS**, **TypeScript**, and **ShadCN UI**.

**Components:**

- **Pages**: `Dashboard`, `Transactions`, `Analytics`.  
- **Components**: `Sidebar`, `Navbar`, `Filters`, `TransactionTable`, `Pagination`.  
- **Hooks**: Custom hooks like `useSalesQuery` for fetching data.  
- **Services**: Axios-based API calls to backend endpoints.  
- **State Management**: Local state with React hooks (`useState`, `useEffect`), `useMemo` for computed values.  
- **Styling**: Tailwind CSS + ShadCN UI for reusable UI components.

**Flow:**


---

## 3. Data Flow

1. **Frontend Request**: User performs an action (e.g., fetch transactions).  
2. **API Call**: Axios sends HTTP request to backend endpoint.  
3. **Backend Processing**: Express route calls controller → controller queries MongoDB via Mongoose model.  
4. **Response**: Backend sends JSON response to frontend.  
5. **Rendering**: Frontend updates UI with received data.

**Example:** Fetching sales transactions


---

## 4. Folder Structure


---

## 5. Module Responsibilities

| Module/Folder         | Responsibility |
|----------------------|----------------|
| **backend/src/controllers** | Handle incoming requests and implement business logic |
| **backend/src/models**      | Define MongoDB schemas and data validation |
| **backend/src/routes**      | Map API endpoints to controllers |
| **backend/src/config**      | Configure database connection and environment variables |
| **frontend/src/components** | Reusable UI elements (Sidebar, Navbar, Tables) |
| **frontend/src/hooks**      | Custom hooks for fetching and processing data |
| **frontend/src/services**   | Axios API calls to backend endpoints |
| **frontend/src/App.jsx**    | Main entry component, routing, and layout setup |

---

**End of Document**
