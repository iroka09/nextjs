
export default (props)=>{
  
  return(<h1>{props.obj?.name}</h1>)
}

export function getServerSideProps(context){
  console.log(context.req)
  return ({
    props: {
      obj: {name: "iroka"}
    }
  })
}