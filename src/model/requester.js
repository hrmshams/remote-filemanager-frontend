const axios = require("axios")
const queryString = require("query-string")

// const { sleep } = require("./../components/utility")
const server = "http://localhost:3030/"

const ENDPOINTS = {
  ls: {
    url: server + "file-manager/ls",
    method: "POST",
  },
}

const request = async (endpoint, body) => {
  let query = ""
  if (endpoint.method === "GET" && body) {
    query = queryString.stringify(body)
    query = "?" + query
  }
  try {
    const { data } = await axios({
      method: endpoint.method,
      url: endpoint.url + query,
      data: endpoint.method === "POST" ? body : undefined,
      timeout: 3000,
    })

    return data
  } catch (err) {
    console.error("error in endpoint : " + endpoint.url)
    console.log(JSON.stringify(err))
    return -1
  }
}

// const retryReq = async (reqCallback, count) => {
//   count = count > 1 ? count : 3
//   for (var i = 0; i < count; i++) {
//     const r = await reqCallback()
//     if (r !== -1) {
//       return r
//     }

//     await sleep(100)
//     console.log("--- request failed in retry: " + i)
//   }
//   return -1
// }

export { ENDPOINTS, request }
