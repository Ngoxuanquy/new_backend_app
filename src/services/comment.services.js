

const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response.js")
const { PrismaClient } = require('@prisma/client');
const { comments } = new PrismaClient();

// define Factory class to create product
class CommentFactory {

    static async createComment(payload) {

        console.log(payload)

        const product = await comments.create({
            data: {
                user_id: Number(payload.user_id),
                order_id: Number(payload.orderId),
                content: payload.conten,
                de_nghi_id: null,
                customer_care_id: null,
                types: null,
                parent_id: undefined, // Set parent_id to undefined
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return product;

    }

    static async getComment(decode) {

        const pageNumber = 1; // Số trang muốn lấy
        const perPage = 2; // Số bản ghi trên mỗi trang

        const skip = (pageNumber - 1) * perPage; // Số bản ghi muốn bỏ qua
        const take = perPage; // Số bản ghi muốn lấy

        const Get_product = await comments.findMany({
            skip,
            take,
            where: {
                order_id: Number(decode.id)
            }
        })

        return Get_product;

    }

}

// // define base product class
// class Product {
//     constructor({
//         product_name, product_thumb, product_description, product_price,
//         product_type, product_shop, product_attributes, product_quantity
//     }) {

//         this.product_attributes = product_attributes
//         this.product_quantity = product_quantity
//         this.product_name = product_name
//         this.product_thumb = product_thumb
//         this.product_description = product_description
//         this.product_price = product_price
//         this.product_type = product_type
//         this.product_shop = product_shop

//     }

//     // create new product
//     async createProduct() {
//         return await product.create(this)
//     }

// }


module.exports = CommentFactory