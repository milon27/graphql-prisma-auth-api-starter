import { rule } from 'graphql-shield'
import { verifyJwtToken } from '../../utils/Helper'
import { iContext } from '../Context'

export const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx: iContext, info) => {
    try {
        const { req } = ctx
        const token = req.cookies.gql_auth_token
        const id = verifyJwtToken(token)
        ctx.id = id
        return true;
    } catch (e) {
        return false;
    }
})

export const isPublic = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    //any body can access it.
    return true;
})