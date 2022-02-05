//export const url = '172.17.0.2'
// export const url = 'host.docker.internal'
require("dotenv").config()
export const url = process.env.HISTORY_URL;
export const port = '5005'
export const entryPoint = 'searchhistory'
