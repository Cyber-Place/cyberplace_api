// export const url = '172.17.0.2'
// export const url = 'host.docker.internal'
require("dotenv").config()

export const url = process.env.ACCOUNT_URL;
export const port = '8000'
export const entryPoint = 'api/v1'
