# CS411-B36-Project


This is our movie searching application, displaying locations of where movies had been filmed and giving the user the ability to add to a watchlist. 

Our Backend is in the backend folder, the frontend is named prototype.

To run back end, type npm rum dev into terminal inside the backend directory.

On the site, simply type in the name of the movie you wish to search in the searchbar.

The APIs incorporated are the IMBD and Utelly Apis, with support from MongoDB

## Setup
There are a number of packages that must be configured to run this application locally. Unfortunately, true server hosting will not be implemented for the application.

Git clone the application into the directory of your choice. Then, from the root folder, run the following commands:

```
npm install express --dev
npm install mongoose --dev
npm install nodemon --dev
npm install dotenv
npm install concurrently
```

Cd into the `/prototype` folder and run

```
npm install react
npm install react-scripts
npm install reactjs-popup
```

## Running the app
If you simply wish to launch the server (e.g., for testing purposes), run `npm start` from the `/backend` folder. To launch the entire application, run `npm run dev` from the `/backend` folder.