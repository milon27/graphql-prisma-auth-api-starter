import { iContext } from "../Context"

const DataResolver = {
    Query: {
        privateDate: (parent: any, args: any, context: iContext): string => {
            const { id } = context
            return "user id: " + id
        },
    }
}
export default DataResolver