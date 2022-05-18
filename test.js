const fs = require("fs")
const axios = require("axios")

console.log("waiting")
axios.get("https://opentdb.com/api.php?amount=50")
.then(resp=>{
  fs.writeFileSync("./questions.json", JSON.stringify(resp.data,0,3))
  console.log("done")
})
.catch((err)=>{
  console.log(err)
})