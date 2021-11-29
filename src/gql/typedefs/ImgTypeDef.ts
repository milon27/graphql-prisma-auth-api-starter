import { gql } from "apollo-server-core";

const ImgTypeDef = gql`

    #query
    type Query{
        #get all img url
        getAllImg:[String!]!
    }

    #mutation
    type Mutation{
        UploadImg(file:Upload!):String
    }
   
`
export default ImgTypeDef