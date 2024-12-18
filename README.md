# startup

Startup application for BYU CS 260

[Notes](notes.md)

## Specification

I am going to make a grocery price tracker that helps users find the best deals across various stores. It will utilize multiple APIs and web scrape to fetch current prices and monitor grocery sales. Users can create grocery lists, and the site will calculate the most cost-effective way to shop. It will provide real-time updates on new discounts and price changes. Users will login, compare grocery prices at different stores, build list and monitor sales and price updates.

- **HTML**: Create pages for grocery list input, price tracking, and user login
- **CSS**: Style elements to create a clean UI
- **JavaScript**: Handle actions like adding items to the list, filtering prices, and user interactions
- **React**: Build easy to navigate website portal with components for list management, price tracking, and sales monitoring
- **Web Service**:
  - Set up backend endpoints to get prices from external APIs and scrape websites for sales
  - Use an external grocery API for up-to-date pricing
- **Authentication**: Allow users to register, log in, and view their saved grocery lists
- **Database**: Store user accounts, grocery lists, and past purchases, then display grocery lists (will likely use mongoDB or some SQL database)
- **WebSocket**: Provide real-time updates on new sales and price changes

![image info](sketch.jpg)

## HTML

Basic flow of application is

Homepage - Users can browse groceries and add to list

Login - Login or create account (this is neccesary to save grocery lists)

List - User can view their grocery list, edit quantities, and the application does the math to find the cheapest store for them based on their list

Sales - Shows current sales going on (this is where the websocket will be used as it will live update sales found)

Product - The product page will focus on one product showing a breakdown of price at each

## CSS

Basic styling for lists using grids and other basic css

I'm guessing a lot/most of this will change when we move to react

## React

Split things into components

Much more readable code and re-usable

## Service

Added the backend service
I am using a csv file as a database for now

-Calls to the api are made to fetch database prices
-Users are able to search for items not in the database which then calls a 3rd party api

## Login & Mongo

Connected mongoDB database
Created endpoints for authentication and store users in mongo

Endpoints must be validated with authentication

Also created a collection for lists and save users lists info in mongo so list can be saved and retrieved

Can only access my list tab if logged in

## Websocket

On the sales page users can report an updated price on an item and it will display to other users
