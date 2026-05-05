# StayFinder - Full Stack Property Reservation Platform

StayFinder is an independently developed full-stack web application inspired by modern accommodation booking platforms.
It enables users to browse available stays, create and manage property listings, submit bookings, and track reservation requests through a responsive and secure web interface.

---

## Live Deployment

**Website:** https://stayfinder-n48x.onrender.com/

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* JavaScript
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB with Mongoose

### Authentication

* JWT Authentication
* HTTP-only Cookies
* Protected Routes

### Cloud Storage

* Cloudinary Image Uploads

---

## Project Modules

### User Authentication

* User registration and login
* Secure JWT-based session management
* Logout functionality
* Route protection for authenticated users

### Property Listing Management

* Create new listings
* Upload listing images
* View all listed properties
* Edit/Delete owned listings

### Search and Browse

* Search bar for filtering available properties
* Responsive listing display
* Property detail view

### Booking and Reservation Management

* Book properties using date range selection
* Submit reservation requests
* Track booking history and requests

### Media Handling

* Cloudinary integration for storing and serving uploaded listing images

---

## Key Features

* End-to-end full-stack web application prototype
* Responsive front-end user interface
* Backend CRUD operations for listings and bookings
* JWT-secured authentication workflows
* MongoDB-based data storage
* REST API communication between frontend and backend
* Cloud-based image upload support

---

## Repository Structure

```bash id="h4p1tv"
StayFinder/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── public/uploads/
│   ├── routes/
│   ├── index.js
│   └── seed.js
│
├── Frontend/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

## Installation and Setup

### Clone the Repository

```bash id="4s77x0"
git clone https://github.com/Akankshasingh1005/StayFinder.git
cd StayFinder
```

---

### Backend Setup

```bash id="j7rwsv"
cd Backend
npm install
npm start
```

---

### Frontend Setup

```bash id="8tntn7"
cd Frontend
npm install
npm run dev
```

---

## Environment Variables Required

Create a `.env` file inside the Backend folder and configure:

```env id="80sdhm"
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Learning Outcomes

This project provided hands-on experience in:

* end-to-end prototype development,
* responsive front-end implementation,
* backend CRUD module development,
* JWT authentication workflows,
* REST API integration,
* MongoDB data handling,
* and Cloudinary media management.

---

## Author

**Akanksha Singh**
B.Tech, IIT Jodhpur
GitHub: https://github.com/Akankshasingh1005
