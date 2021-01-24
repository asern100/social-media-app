const { ApolloServer } = require('apollo-server');
const  gql  = require('graphql-tag');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const typeDefs = gql`
    type Query{
        sayHi:String!
    }

`

const resolvers = {
    Query:{
        sayHi: () => "باسم الله الرحمان الرحيم"
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
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
