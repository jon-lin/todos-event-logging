# Todos

A no-frills todos app using the following technologies:
- MongoDB
- Apollo GraphQL
- React 16 (via create-react-app)

# How To Run 
1. Follow [MongoDB's instructions](https://docs.mongodb.com/manual/installation/) to install MongoDB locally if you don't have it. 
2. The instructions should also cover how to run MongoDB locally; make sure you do so. (Your local MongoDB should run by default at `mongodb://localhost:27017`.)
3.  Create a `todos_app` database and a blank `todos` collection in that database. Optional: [MongoDB Compass](https://www.mongodb.com/products/compass) is an easy GUI for viewing/managing your databases and collections.
4. Run `yarn` at this repo's root directory to install necessary packages.
5. Run `yarn start-server` to run the Apollo server.
6. Run `yarn start` to start the React app. You should now be able to CRUD on todos in the app.
