const { gql } = require('apollo-server');
const { PhoneTypeDefs } = require('./phone');

const typeDefs = gql`
    ${PhoneTypeDefs}

    "The object that defines all the queries"
    type Query {
        "Returns information about the server"
        info: String
    }
`;

module.exports = { typeDefs };