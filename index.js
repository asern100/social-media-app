const { ApolloServer , PubSub} = require('apollo-server');
const mongoose = require('mongoose');

const dotenv = require("dotenv");
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');



const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
})




dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }).then(() => {
    console.log("connected to atlas SUCCESS !");  
    return server.listen({
        port: 5000
    })
  }).then((res) => {
    console.log(`Server runnig at ${res.url}`)
});
