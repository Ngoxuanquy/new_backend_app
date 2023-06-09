

const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response.js")
const { PrismaClient } = require('@prisma/client');
const { order_histories } = new PrismaClient();
const prisma = new PrismaClient()
// define Factory class to create product
class OrderHistoryFactory {

    static async createOrderHistory(payload) {

        const orders = await order_histories.count({
            where: {
                ordersId: Number(payload.ordersId)
            },
        })

        console.log(payload)

        if (orders == 0) {
            const order_historie = await order_histories.create({
                data: {
                    business_id: payload.business_id,
                    order_id: payload.ordersId,
                    customer_id: Number(payload.customer_id),
                    nvkt_id: Number(payload.nvkt_id),
                    nvkd_id: payload.nvkd_id,
                    type: payload.type,
                    status: payload.status,
                    ord_status: payload.ord_status,
                    ordersId: payload.ordersId,
                    transactionsId: Number(payload.transaction_id),
                    contactsId: Number(payload.customer_id)
                }
            })

            return order_historie;
        }
        // else {
        //     return order_historie;
        // }

    }

    static async getOrderHistory(payload) {


        const pageNumber = 1; // Số trang muốn lấy
        const perPage = 5; // Số bản ghi trên mỗi trang

        const skip = (pageNumber - 1) * perPage; // Số bản ghi muốn bỏ qua
        const take = perPage; // Số bản ghi muốn lấy

        const Get_product = await order_histories.findMany({
            skip,
            take,
            include: {
                transactions: true,
                orders: true,
                contacts: true
            },
            where: {
                status: 'Đã Thanh Toán',
                nvkt_id: Number(payload.id)
                // Replace 123 with the actual integer value you want to filter by
            }

        })

        return Get_product;
    }



    static async updateOrderHistory(payload) {

        console.log(payload)

        const Get_product = await order_histories.updateMany({
            data: {
                status: 'Đã Thanh Toán',
            },
            where: {
                ordersId: Number(payload.id)
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


module.exports = OrderHistoryFactory