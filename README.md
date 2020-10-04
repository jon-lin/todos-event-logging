# Todos With Event Logging

A todos app souped up with granular event logging using the following technologies and following Martin Fowler's thoughts on [event sourcing](https://www.martinfowler.com/eaaDev/EventSourcing.html):
- MongoDB
- Apollo GraphQL
- React 16 (via create-react-app)

# How To Run 
1. Follow [MongoDB's instructions](https://docs.mongodb.com/manual/installation/) to install MongoDB locally if you don't have it. 
2. The instructions should also cover how to run MongoDB locally; make sure you do so. (Your local MongoDB should run by default at `mongodb://localhost:27017`.)
3. Create a `todos_app` database and a blank `todos` collection in that database. Optional: [MongoDB Compass](https://www.mongodb.com/products/compass) is an easy GUI for viewing/managing your databases and collections.
4. Create a blank `events` collection in the `todos_app` database as well.
5. Run `yarn` at this repo's root directory to install necessary packages.
6. Run `yarn start-server` to run the Apollo server.
7. Run `yarn start` to start the React app. You should now be able to CRUD on todos in the app.
