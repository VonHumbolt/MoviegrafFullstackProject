# Moviegraf Fullstack Web Project

Generated with Node.js for backend and Next.js for frontend.

## Brief of Project

Moviegraf is a fullstack web project that is written with Node.js and Next.js.
The purpose of this app is to create a platform where users can search for movies and add them to their watching lists.
To add movies to the watchlist, users need to register on the platform. They can search for films by their names and then get information about their subject, actors and directors. Only admin users can add new movies in the system with add movie page. On the homepage, users can view the most liked movies of the week, discover genres and leading movies of all time.

## Technologies

<h4>Backend</h4>
<ul>
    <li>JavaScript</li>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>Docker</li>
    <li>Json Web Token</li>
    <li>Multer</li>
</ul>

<h4>Frontend</h4>
<ul>
    <li>JavaScript</li>
    <li>Next.js</li>
    <li>Shadcn</li>
    <li>Zustand</li>
    <li>Tailwind Css</li>
    <li>Parallel and Intercepting Routes</li>
</ul>

## Usage Of Technologies

<h4>Backend</h4>

Rest api was created with JavaScript and Express.js. MongoDB was used as Database.
Database queries and models were created using the Mongoose library.
For authorization and authentication processes, Json web token was used. 
Movie images uploaded by users are stored in the local folder using Multer.
Docker was used for running MongoDB database and Mongo-Express as container.

<h4>Frontend</h4>

Frontend was created with Next.js and JavaScript. Shadcn was used for components such as Button, Dropdown, Toast.
To manage global state, Zustand preferred. Parallel and intercepting routes were used for accessing watching list page.
Tailwind Css was used for App UI design.

## How can I use this project?

1. Clone or Download as zip folder of this repository

        git clone https://github.com/VonHumbolt/MoviegrafFullstackProject.git

2. Open cmd in the project root. And, run docker compose file.

        docker compose up -d

3. Go to backend folder directory, install dependencies and then run the backend server.

        npm install
        npm run dev

4. Go to frontend folder directory, install dependencies and then run the frontend app.

        npm install
        npm run dev

5. The running ports of the project:

        Backend: localhost:5000
        Frontend: localhost:3000
        MongoDB: localhost:27017
        Mongo-Express: localhost:8091

## Trailer of the Project

<div align="center">
    
https://github.com/user-attachments/assets/f63baad5-6941-41ec-817a-b21aa5cc5158

</div>


