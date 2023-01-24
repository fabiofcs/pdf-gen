import { createSchema } from 'graphql-yoga'
import { pdfResolver } from './resolvers/pdfGen'


const typeDefs = /* GraphQL */ `
type Query {
   pdf: String
}
`;

export const schema = createSchema({
    typeDefs,
    resolvers: {
        Query: {
            pdf: pdfResolver
        }
    }
})
