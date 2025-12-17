
```md
# KAMP — Kazakhstan Association of Professional Marketers

KAMP is a web application for the Kazakhstan Association of Professional Marketers, a public organization aimed at creating optimal conditions for implementing advanced marketing methods and promoting goods and services. We unite leading professionals to develop a strong professional community.

---

## Live Demo
https://gos-project-versel.vercel.app

---

## Backend API
- **MockAPI (REST)**
- Real CRUD operations
- Dynamic data (not hardcoded)

---

## Test Accounts

| Role | Email | Password |
|------|-------|---------|
| **Admin** | admin@kamp.kz | admin123 |

> User role is available after a regular login (without admin privileges).

---

## Functionality

### User
- Personal profile — `/profile`
- News feed — `/news`
- Protected routes (accessible only after login)
- Responsive mobile design
- Handles loading, error, and empty states

### Admin
- Admin panel — `/admin`
- Create news — `/admin/news`
- Edit news
- Delete news
- Full CRUD operations via API
- Restricted access (admin-only)

---

## Authentication & Security
- JWT Token
- Token stored in `localStorage`
- Protected routes (User / Admin)
- Role verification before accessing admin panel

---

##  Routing
- `/login` — Login page  
- `/news` — News feed  
- `/profile` — User profile  
- `/admin` — Admin panel  
- `/admin/news` — Manage news  

---

## Tech Stack

| Category       | Technologies |
|----------------|-------------|
| Frontend       | Vue 3, Vite, Vue Router, Axios |
| Backend        | MockAPI, REST API |
| UI / UX        | TailwindCSS, Glassmorphism, Responsive |
| State & Auth   | localStorage, JWT Token, Protected Routes |

---

## Core Features

* Authentication (login + token storage)
* Role-based protected routes
* CRUD operations via API
* Dynamic data (no hardcoded content)
* Handles loading, error, and empty states
* Responsive UI
* Clean component architecture
* Notifications for success/error actions

---

## Deployment
* **Vercel**
```
