import { shield } from "graphql-shield"
import { isAuthenticated, isPublic } from "./rule"

const Permissions = shield({
    User: isPublic,
    Query: {
        login: isPublic
    },
    Mutation: {
        signUp: isPublic
    }
}, { 
    fallbackRule: isAuthenticated,
     allowExternalErrors: true
})

export default Permissions












// without shield

// import { iContext } from "../Context";

// const publicMiddleware = async (resolve: any, parent: any, args: any, context: iContext, info: any) => {
//     //no ck auth
//     const result = await resolve(parent, args, context, info)
//     console.log("Any body can access this.");
//     return result
// }

// //run on every where..
// const queryMiddle = async (resolve: any, parent: any, args: any, context: iContext, info: any) => {
//     //ck auth here
//     //throw new Error("no user")
//     const result = await resolve(parent, args, context, info)
//     console.log("Only Query Middleware");
//     return result
// }

// const mutationMiddle = async (resolve: any, parent: any, args: any, context: iContext, info: any) => {
//     //ck auth here
//     const result = await resolve(parent, args, context, info)
//     console.log("Only Mutation Middleware");
//     return result
// }

// const globalMiddleWare = {
//     Query: queryMiddle,
//     Mutation: mutationMiddle
// }

// const PublicMiddleWare = {
//     User: publicMiddleware
// }


// /**
//  * todo: how to only make public auth query and mutation.
//  */



// const AllMiddleWare: any[] = [
//     PublicMiddleWare,
//     globalMiddleWare
// ]
// export default AllMiddleWare
