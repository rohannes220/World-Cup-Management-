

# World Cup Management

By Daniel Jilek - jilek.d@northeastern.edu, Rohan Kumar - kumar.rohan1@northeastern.edu
Class: Web Development
Term: Spring 2026
Professor John Guerra

## Overview

World Cup Management is a full-stack web application that centralizes tournament infrastructure and team management into a single system. The application allows organizers to manage host cities, stadiums, games, teams, and players through structured CRUD operations.

The project is built using:

* **Node.js + Express** (Backend)
* **MongoDB** (Database)
* **Vanilla JavaScript** with client-side rendering (Frontend)

The architecture is modular, separating Infrastructure management from Team management while maintaining consistent and scalable data relationships.

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
* Demo Video: *(Add link here if applicable)*


## Design Document

The full design document, including project description, work distribution, user personas, user stories, and mockups, is included in this repository.

* Design Document: https://docs.google.com/document/d/1irDO8ZcsYC7XYIGgyevcnNJ8SskyURsI39l2ti3nwiE/edit?usp=sharing

---

## AI Usage

AI tools were used to assist with backend architecture, MongoDB data modeling, and frontend–backend integration. AI helped clarify how to structure Express routes, manage embedded stadium data inside city documents, reference players to teams using ObjectId, and implement dynamic dropdown features populated from backend data.

AI was also used for debugging route responses, updating nested arrays in MongoDB, and validating form inputs. All CRUD logic, routing, and frontend functionality were implemented and structured by the team. AI served as an architectural and debugging assistant rather than a code generator.

---

## Image Credits

The stadium field image used in this project was sourced from **Pexels** and is used in accordance with Pexels’ free-use license.

---

# Screenshots



---

If you want, I can now make a slightly more polished “professor-impressing” version that aligns perfectly with your CS5610 rubric language.
