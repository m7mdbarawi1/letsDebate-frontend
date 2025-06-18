<<<<<<< HEAD
## LetsDebate Frontend (React + Vite)
This is the frontend for the LetsDebate web application. The platform allows users to explore live debate sessions and reserve seats, while admins can manage those sessions. Built using React and Vite, it includes authentication, session management, and weather integration.

## USER REQUIREMENTS
1. Normal Users:
View a list of debate sessions.
Search sessions by title and filter by category.
View full session details like description, price,..etc.
Manage his reservations(reserve session, cancel reservation).
Can manage his account using some operations like(Register, log in, Read, Update, Delete)
View about us page.
2. Admin Users:
Search sessions by title and filter by category.
Can manage the sessions using some operations like(Create, Read, Update, Delete)
Can manage his account using some operations like(Register, log in, Read, Update, Delete)
View about us page.
3. Guests
Just explore main pages like home, about us, session details

## Technologies
React 18
Vite
Fetch API from server and external
LocalStorage

## External API
used weather API from https://www.weatherapi.com/ and used on sessions cards

## MIT License
You are free to use, modify, and distribute this project.

## Authentication
localStorage is used to persist user sessions across page reloads.
The App.jsx file contains logic to check and set the current user based on stored data.

The navigation bar is rendered based on user role:
Guest  <GuestNavbar />
Normal User  <NormalNavbar />
Admin  <AdminNavbar />

## assets
contain the logo image and css file

## compononets
contain all "components" pages which is jsx file contain js functions for each component


## Getting Started
cd LetsDebate-frontend
npm install
npm run dev

## Routing 
    "/" for home(index page)
    "/login" for login page
    "/signup" for sign up page
    "/about" for about us page
    "/sessions/:id" for SessionDetails page
    "/add-session" for AddSession page
    "/delete-session" for DeleteSession page
    "/update-session" for UpdateSession page
    "/profile" for profile page
    "/my-reservations" for MyReservations page
## Authors
Developed by: Mohammad Al Barawi