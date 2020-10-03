const { MongoClient } = require('mongodb')
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    description: String
    isDone: Boolean
  }
`;

const resolvers = {
  Query: {
    todos: (parent, args, context, info) => {
      const { db } = context
      
      return db.collection('todos').find().toArray()
    },
  },
};

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err

  console.log(`Connected to MongoDB cluster`)

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => ({ db: client.db('todos_app') }),
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})
