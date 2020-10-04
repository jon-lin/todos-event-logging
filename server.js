const { MongoClient, ObjectId } = require('mongodb')
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

  type Mutation {
    createTodo: Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(input: DeleteTodoInput!): Todo!
  }

  input UpdateTodoInput {
    _id: ID!
    description: String
    isDone: Boolean
  }

  input DeleteTodoInput {
    _id: ID!
  }
`;

const resolvers = {
  Query: {
    todos: (parent, args, context, info) => {
      const { db } = context
      
      return db.collection('todos').find().toArray()
    },
  },
  Mutation: {
    createTodo: (parent, args, context, info) => {
      const { db } = context

      return db.collection('todos')
        .insertOne({ description: '', isDone: false })
        .then(res => res.ops[0])
    },
    updateTodo: (parent, args, context, info) => {
      const { input: { _id, description, isDone } } = args
      const { db } = context

      return db.collection('todos')
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          { $set: { description, isDone } },
          { returnOriginal: false },
        )
        .then(({ value }) => value)
    },
    deleteTodo: (parent, { input: { _id } }, context, info) => {
      const { db } = context

      return db.collection('todos')
        .findOneAndDelete({ _id: ObjectId(_id) })
        .then(({ value }) => value)
    },
  }
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
