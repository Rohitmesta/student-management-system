# Student Management System

A full-stack Student Management System built using **Spring Boot** and **React TypeScript**.  
The application provides secure student record management with JWT authentication, role-based access control, dashboard analytics, pagination, search functionality, and a modern admin interface.

---

##  Features

###  Authentication & Security
- JWT based authentication
- Refresh token mechanism
- Role based access control
- Protected frontend routes
- Secure REST APIs using Spring Security

---

###  Student Management
- Add new students
- View student records
- Update student details
- Delete students
- Search students
- Pagination support
- Sorting support

---

###  Department Management
- Department and student relationship mapping
- Dynamic department selection
- Student count by department analytics

---

###  Admin Dashboard
- Total students count
- Total departments count
- Department-wise student analytics
- Interactive charts using Recharts

---

###  Frontend Features
- Modern responsive UI
- Sidebar navigation
- Form validation
- Toast notifications
- Loading states
- Empty state handling

---

#  Tech Stack

## Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- Swagger / OpenAPI

---

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod Validation
- Recharts
- React Hot Toast

---

#  Project Structure

```
Student-Management-System

├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   ├── security
│   └── config
│
└── frontend
    ├── api
    ├── components
    ├── layouts
    ├── pages
    ├── routes
    └── schemas
```

---


Navigate to backend:

```bash
cd backend
```

Configure PostgreSQL database:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Run:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

Swagger:

```
http://localhost:8080/swagger-ui/index.html
```

---

#  Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:8080
```

Run:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

#  API Modules

### Authentication

```
POST /auth/login
POST /auth/refresh
```

---

### Students

```
GET    /api/students
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
GET    /api/students/paged
```

---

### Dashboard

```
GET /api/dashboard/stats
GET /api/dashboard/departments
```

---

#  Screenshots

## Login Page

(Add screenshot)

## Dashboard

(Add screenshot)

## Students Page

(Add screenshot)

---

# Future Improvements

- Docker containerization
- Cloud deployment
- CI/CD pipeline
- AI based student insights

---

#  Author

**Rohit Mesta**

GitHub: Rohitmesta
