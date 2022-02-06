// export const url = '172.0.0.1'
require("dotenv").config()

export const url = process.env.PRODUCT_URL
export const port = '3333'
export const entryPoint = 'products'
