
type wild = string | number
type arr = [boolean, string]
interface obj {
  name?: string
  readonly age: number
}

let x: wild = "john";
let y: arr = [true, "underline"]
let myObj: obj = {
  name: "iroka",
  age: +(new Date().getFullYear()-1996)
}

console.log(x, y, myObj)



/*
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
*/