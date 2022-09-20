//import dotenv from "dotenv";
//import path from "path";
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
require("dotenv").config();

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
//dotenv.config();
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// --------------------------deployment------------------------------
//const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
  );
} else {
  console.log('inside else NODE_ENV === production')
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

/*
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
);
*/

// --------------------------deployment------------------------------



/*
if (process.env.NODE_ENV === 'production') {
  //console.log('im in production mode')
  //app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(express.static("../client/build"));
  app.get('*', (req, res) => {
    //res.send('hello world')
    res.sendFile(path.resolve(__dirname, '../client/','build','index.html'));
  });
}
/*
app.get('/', (req, res) => {
  //res.send('hello world')
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
