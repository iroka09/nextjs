const arr = `Blog
About
Shop
Contact GitHub
Pricing
API
Training
Status
Security
Terms
Privacy
Docs`.split(/\s+/)

const App = ()=>{
  return (
  <div className="bg-black text-gray-300">
    <div className="flex flex-col justify-center p-2 my-3">
    {arr.map((x,i)=>(
      <a key={i} href="#" class="inline-block w-max px-4 py-2 hover:bg-gray-800 my-2">{x}</a>
    ))}
    </div>
    <div className="flex flex-center ">
      <span>All rights reserved (2021 - {new Date().getFullYear()})</span>
    </div>
  </div>)
}

export default App