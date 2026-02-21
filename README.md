

# World Cup Management

By Daniel Jilek - jilek.d@northeastern.edu, 
Rohan Kumar - kumar.rohan1@northeastern.edu
Class: Web Development
Term: Spring 2026
Professor John Guerra

## Overview

World Cup Management is a full-stack web application that centralizes tournament infrastructure and team management into a single system. The application allows organizers to manage host cities, stadiums, games, teams, and players through structured CRUD operations.

The project is built using:

* **Node.js + Express** (Backend)
* **MongoDB** (Database)
* **Vanilla JavaScript** with client-side rendering (Frontend)


---

## Team Members

**Rohan Kumar – Infrastructure Module**

* Full CRUD for Cities (stadiums embedded inside cities)
* Add, edit, and delete stadiums
* Full CRUD for Games
* Backend and frontend implementation

**Daniel Jilek – Team Management Module**

* Full CRUD for Teams
* Full CRUD for Players
* Manage team rosters and lineups
* Backend and frontend implementation

---

## Features

* Manage host cities and stadiums
* Schedule and update games
* Manage teams and player rosters
* Track match attendance
* RESTful API design
* Modular backend route structure
* Dynamic dropdown population using backend data
* Client-side rendering using `fetch()`

---

## Directions (How to Use the App)

1. Navigate to the **Infrastructure** page to create and manage cities and stadiums.
2. Add stadium availability dates before scheduling games.
3. Go to the **Games** page to schedule matches by selecting a city and stadium.
4. Use the **Teams** page to create teams and manage player rosters.
5. Edit or delete entries as needed using the provided action buttons.

All forms require valid input before submission to maintain data consistency.

---

## Setup Instructions

1. Install dependencies:

```
npm install
```

2. Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

3. Start the server:

```
npm start
```

4. Open in browser:

```
http://localhost:3000
```

---

## Slides & Demo

Project slides and demo presentation materials are included in the repository.

* Slides: https://docs.google.com/presentation/d/1rV23cOee0vkI9minWGmK202waGtKANA61lMYsIuQnnY/edit?usp=sharing
* Demo Video: *(Daniel add it here)*


## Design Document

The full design document, including project description, work distribution, user personas, user stories, and mockups, is included in this repository.

* Design Document: https://docs.google.com/document/d/1irDO8ZcsYC7XYIGgyevcnNJ8SskyURsI39l2ti3nwiE/edit?usp=sharing

---

AI Usage

ChatGPT (GPT-5.2 model) was used to assist with backend architecture, CRUD operations, and frontend–backend integration. It helped clarify how to structure Express routes, organize MongoDB collections, and properly implement create, read, update, and delete functionality for cities, stadiums, games, teams, and players.

ChatGPT was also used to help design and implement dynamic dropdown features, including populating dropdown menus from backend data and filtering stadium options based on a selected city. Additionally, it assisted with debugging route responses, and improving overall backend structure. 

ChatGPT provided guidance on how to connect the application to MongoDB, configure Mongoose models, and properly perform create, read, update, and delete operations within route files. This support helped clarify best practices for organizing routes and ensuring reliable database interaction. It also helped with server backend routes and CRUD operations

Example Prompts Used

“How should I structure Express routes for modular CRUD collections?”

“How do I embed stadiums inside a MongoDB city document?”

“How do I update nested arrays in MongoDB?”

“How do I reference players to teams using ObjectId?”

“How do I populate a dropdown using fetch() from backend data?”

“How do I filter one dropdown based on another selection?”

“Why is my Express route returning undefined?”


---

## Image Credits

The stadium field image used in this project was sourced from **Pexels** and is used in accordance with Pexels’ free-use license.

---

# Screenshots


1. Home Page
   <img width="1424" height="707" alt="Screenshot 2026-02-20 at 6 53 46 PM" src="https://github.com/user-attachments/assets/6906876d-137b-47db-bb85-f34e1005fbdf" />
2. Infrastructure
  <img width="1415" height="702" alt="Screenshot 2026-02-20 at 6 54 26 PM" src="https://github.com/user-attachments/assets/f789d5f7-146e-473d-8969-d43363d43374" />
3. Daniel add yours here 
