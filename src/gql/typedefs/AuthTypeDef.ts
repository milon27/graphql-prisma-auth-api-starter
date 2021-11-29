import { gql } from "apollo-server-core";

const AuthTypeDef = gql`
    type User{
        id:Int
        email:String!
        password:String
        token:String
    }

    #query
    type Query{
        login(email:String,password:String):User,
        logout:Boolean
    }

    #input
    input InputUser{
        email:String!
        password:String!
    }

    #mutations
    type Mutation{
        signUp(inputUser:InputUser):User
    }
`
export default AuthTypeDef