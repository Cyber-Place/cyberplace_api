//export const url = '172.17.0.2'
// export const url = 'host.docker.internal'
require("dotenv").config()

export const url = process.env.PURCHASE_URL
export const port = '3030'
export const entryPoint = 'shopping-cart'
