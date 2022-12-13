# CS411-B36-Project
## Overview
This is our movie searching application, displaying locations of where movies had been filmed and giving the user the ability to add to a watchlist. 

Our backend is in the `/backend` folder, while the frontend is in the `/prototype` folder. Most of the front-end code is in `/prototype/src`.

On the site, simply type in the name of the movie you wish to search in the search bar. After a few seconds, the movie(s) will appear, and can be added to a watchlist with the little green "+" button. Click "View Watchlist" to view your updated list of movies!

> Note: the watchlist does not render in real time. To view changes made to your watchlist, you must click out of it and back in again.

The APIs incorporated are the IMDb and Utelly Apis, with support from MongoDB. You may note that IMDb is actually a database, and is accessed through GraphQL queries, not an API; although you are correct, access to the database is granted via the AWS DataExchange, which _is_ an API.

## Setup
There are a number of packages that must be configured to run this application locally. Unfortunately, true server hosting will not be implemented for the application.

Git clone the application into the directory of your choice. Then, from the root folder, run the following commands:

```
npm install express --include=dev
npm install mongoose --include=dev
npm install nodemon --include=dev
npm install dotenv
npm install concurrently
```

Cd into the `/prototype` folder and run

```
npm install react
npm install react-scripts
npm install reactjs-popup
```

In a perfect world, all of these packages would be "packaged" (haha) into a `requirements.txt` file that could be installed in one large batch. Unfortunately, we did not have time to implement that quality-of-life feature.

Please note also that, unless you have access to our environment variables, nothing will work. An env.TEMPLATE has been included for your reference; if you wish to run the app yourself, please contact cwgough@bu.edu.

## Running the app
If you simply wish to launch the server (e.g., for testing purposes), run `npm start` from the `/backend` folder. To launch the entire application, run `npm run dev` from the `/backend` folder.
