
const { CREATED, SuccessResponse } = require("../core/success.response")
const CommentServices = require("../services/comment.services")



class ContactControllers {

    createComment = async (req, res, next) => {

        console.log(req.body)

        new SuccessResponse({
            message: 'create new product success',
            metadata: await CommentServices.createComment(req.body)
        }).send(res)

    }

    getComment = async (req, res, next) => {

        new SuccessResponse({
            message: 'Get product success',
            metadata: await CommentServices.getComment(req.params)
        }).send(res)
    }

}

module.exports = new ContactControllers()