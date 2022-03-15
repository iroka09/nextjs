//every file stored inside page/api will be loaded as server i.e like an expressjs but not express, but will be exported as react i.e "export default" instead of module.exports

export default function(req,res){
  res.send({done: true})
}