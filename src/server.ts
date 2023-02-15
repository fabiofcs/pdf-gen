import express from 'express';
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";


const app = express();

const yoga = createYoga({ schema });

app.use(express.static("src/public"))
app.use('/graphql', yoga);


app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
});