#  Sales Management System (SMS)

## 1. Overview
This is a comprehensive Retail Sales Management System designed to handle a large transaction dataset efficiently. The system demonstrates professional software engineering practices by implementing advanced data manipulation features, including robust global search, multi-faceted filtering, stable sorting, and scalable pagination. The frontend provides a modern, responsive dashboard UI built with React and Tailwind CSS.

---

## 2. Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | Fast, scalable, and  API services. |
| **Database** | MongoDB (via Mongoose) | 
| **Frontend** | React (with Vite) | 
| **State Management** | React Hooks (`useReducer`, `useState`, `useCallback`) | Centralized, predictable state management for complex query parameters (Search, Filter, Sort, Page). |
| **Styling** | Tailwind CSS | Utility-first framework for rapid, responsive, and maintainable styling, matching the structured UI design. |
| **Data Fetching** | Axios | Promise-based HTTP client for cleaner API interaction. |

---

## 3. Search Implementation Summary
* **Mechanism:** Full-text search implemented on the backend using **MongoDB's `$or` operator** with **case-insensitive regular expressions (`new RegExp(search, 'i')`)**.
* **Fields Covered:** `Customer Name`, `Phone Number`, `Product Name`, and `Transaction ID`.
* **Frontend:** Uses the `useSalesQuery` hook with a **300ms debounce** on the search input to prevent excessive API calls while typing, ensuring high performance.

---

## 4. Filter Implementation Summary
* **Mechanism:** Implemented entirely on the backend using **MongoDB's `$match` operator**.
* **Equality Filters:** Filters like `Gender`, `Customer Region`, and `Product Category` use simple equality checks (`field: value`).
* **Range Filters:** Filters like `Age Range` (`minAge`, `maxAge`) and `Amount Range` (`minAmount`, `maxAmount`) use MongoDB's range operators (`$gte`, `$lte`).
* **Functionality:** All filters are composed into a single query object, maintaining state alongside search and sorting, and automatically resetting to page 1 upon application.

---

## 5. Sorting Implementation Summary
* **Mechanism:** Implemented on the backend using **MongoDB's `.sort()` method**.
* **Fields:** Sorting is supported for `Date` (default), `Quantity`, `Customer Name`, and `Final Amount`.
* **Frontend:** The UI allows toggling between ascending (`asc` / `1`) and descending (`desc` / `-1`) orders for the selected field. The backend handles proper numeric, string, and date comparisons.

---

## 6. Pagination Implementation Summary
* **Mechanism:** Implemented on the backend using **MongoDB's `.skip()` and `.limit()` methods**.
* **Page Size:** Hardcoded to **10 items** per page (`limit: 10`).
* **Data Control:** The backend calculates `totalRecords` (using `countDocuments`) and `totalPages` to ensure accurate navigation metadata.
* **Frontend:** The `PaginationControls` component renders dynamic, numbered buttons (limited to 6 buttons visible at a time) and handles `Next`/`Previous` navigation, retaining all active search, filter, and sort states upon page change.

---

## 7. Setup Instructions

### Prerequisites
1.  Node.js (LTS recommended)
2.  MongoDB instance (running locally or remotely)
3.  `sales_data.csv` file (placed in `backend/src/utils/`)

### A. Backend Setup
1.  Navigate to the `backend/` directory.
2.  Install dependencies: `npm install`
3.  **Database Import:** Run the import command to load data into MongoDB (assuming `sales_data.csv` is in `backend/src/utils/`):
    ```bash
    mongoimport --db RetailSalesDB --collection sales --type csv --file src/utils/sales_data.csv --headerline --drop
    ```
4.  **Configuration:** Set your MongoDB connection string (`mongodb://localhost:27017/RetailSalesDB`) in your environment variables or a `.env` file (using the key `mongo_url`).
5.  Start the backend server: `npm start` (Runs on `http://localhost:3000`)

### B. Frontend Setup
1.  Navigate to the `frontend/` directory.
2.  Install dependencies: `npm install`
3.  Start the frontend development server: `npm start` (Runs on `http://localhost:5173` or similar)

The application should now be fully functional, retrieving filtered and paginated data from the MongoDB backend.