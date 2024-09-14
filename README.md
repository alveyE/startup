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
