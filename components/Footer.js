const arr = `Blog,About,Shop,Contact GitHub,Pricing,API,Training,Status,Security,Terms,Privacy,Docs`.split(",")

const App = ()=>{
  return (
    <footer className="bg-slate-800 text-slate-300 py-3 px-2" >
      <ul className="grid grid-cols-12 p-2 my-3 container-sm">
      {arr.map((x,i)=>(
       <li className="col-span-6 md:col-span-4">
        <a className="inline-block px-4 py-1 hover:bg-slate-600" key={i} href="#">{x}</a>
       </li>
      ))}
      </ul>
      <hr className="my-3 border-slate-600"/>
      <div className="flex justify-center ">
        <span>All rights reserved (2021 - {new Date().getFullYear()})</span>
      </div>
    </footer>)
}

export default App