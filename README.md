# CS411-B36-Project


This is our movie searching application, displaying locations of where movies had been filmed and giving the user the ability to add to a watchlist. 

Our Backend is in the backend folder, the frontend is named prototype.

To run the application, navigate to the backend directory and type "npm run dev" into terminal.

On the site, simply type in the name of the movie you wish to search in the search bar.

The APIs incorporated are the IMBD and Utelly Apis, with support from MongoDB

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
