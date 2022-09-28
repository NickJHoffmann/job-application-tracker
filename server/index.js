const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require("path");

const PORT = process.env.PORT || 3001;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

const app = express();

// Set GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

// Set catch-all path to serve React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Test GET request to /api endpoint
app.get("/api", (req, res) => {
    res.json({message: "Hello from the other side"});
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});