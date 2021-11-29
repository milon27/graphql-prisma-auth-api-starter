import { iContext } from "../Context"

const ImgResolver = {
    Query: {
        getAllImg: (parent: any, args: any, context: iContext): [string] => {
            return ["img1.png"]
        },
    },
    Mutation: {
        UploadImg: () => {
            return "path"
        }
    }
}
export default ImgResolver