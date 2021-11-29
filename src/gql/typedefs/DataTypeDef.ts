import { gql } from "apollo-server-core";

const DataTypeDef = gql`

    #query
    type Query{
        privateDate:String
    }
   
`
export default DataTypeDef