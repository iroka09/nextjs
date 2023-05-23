import React, {memo, useMemo, useState, useCallback, useEffect, useRef} from "react"
import Head from "next/head"
import random from "random"
import {countries as _countries} from "../countries"

_countries.sort(x=> (Math.random()<0.5)?-1:1)

function App() {
  
const [newTeams, setNewTeams] = useState("0");
const countries = useMemo(()=>{ 
  let i = random.int(0, _countries.length-1)
  let j = random.int(0, _countries.length-1)
  if(i===j) {
    i = 0;
    j = 1;
  }
  return [_countries[i], _countries[j]].map(x=>({name: x.name, flag: x.flag}));
}, [newTeams])

const navList = useMemo(()=>{ 
  return _countries.slice(0,10).map(x=>({name: x.name, flag: x.flag}));
}, [])

const rawData = useMemo(()=>{
  return [{
    "name": countries[0]?.name||"Manchester City",
    "flag": countries[0]?.flag,
    "points": [0, 0, 0, 0, 0],
    "indexToPlay": 0,
    "winLossStatus": undefined
  },{
    "name": countries[1]?.name||"Arsenal",
    "flag": countries[1]?.flag,
    "points": [0, 0, 0, 0, 0],
    "indexToPlay": 0,
    "winLossStatus": undefined
  }];
}, [newTeams]);
  
  const [teams, setTeams] = useState(rawData)
  
  const teamTurn = useRef(random.int(0,1));
  const [autoPlay, setAutoPlay] = useState(true);
  
  function handlePlay(winLossType, teamIndex){
    if(teams[0].winLossStatus||teams[1].winLossStatus||teams[teamIndex].points[4]!==0) return;
    setTeams(teams.map((x,i)=>{
        if(i===teamIndex&&teamIndex===teamTurn.current) {
          if(x.indexToPlay>4){
            return x
          }
          x.points[x.indexToPlay]=winLossType;
          x.indexToPlay = (x.indexToPlay<4)? ++x.indexToPlay : x.indexToPlay;
          teamTurn.current = (teamTurn.current===1)? 0:1
          return x; 
        }
        else  return x
      })
    );
    checkWinner()
  }
  
  function checkWinner(){
    let aPoints = teams[0].points;
    let bPoints = teams[1].points;
    let aTotalWon = aPoints.filter(x=>{
      return (x==="WIN")
    }).length
    let aTotalWonAndEmpty = aPoints.filter(x=>{
      return (x==="WIN"||x===0)
    }).length
    let bTotalWon = bPoints.filter(x=>{
      return (x==="WIN")
    }).length
    let bTotalWonAndEmpty = bPoints.filter(x=>{
      return (x==="WIN"||x===0)
    }).length
    if(aTotalWon > bTotalWonAndEmpty){
      setTeams(teams.map((x,i)=>{
          if(i===0) {
            x.winLossStatus = "WIN"
          }
          else x.winLossStatus = "LOST"
          return x
        })
      );
      setAutoPlay(false)
    }
    else if(bTotalWon > aTotalWonAndEmpty){
      setTeams(teams.map((x,i)=>{
          if(i===1) {
            x.winLossStatus = "WIN"
          }
          else x.winLossStatus = "LOST"
          return x
      }));
      setAutoPlay(false)
    }
      //five point finished playing
    else if(teams[0].points[4]!==0 && teams[1].points[4]!==0)  {
      setTeams(teams.map(x=>{
        x.winLossStatus = "DRAW"
        return x
      }))
      setAutoPlay(false)
    }
  }
  
  useEffect(()=>{
    if(!autoPlay) return;
      let x = setInterval(()=>{
      let winLossType = (Math.random()<0.5)? "LOSS" : "WIN";
      handlePlay(winLossType, teamTurn.current)
      }, 1000)
      return ()=> clearInterval(x)
  }, [autoPlay, newTeams])
  
  
  return(
  <>
    <Head>
      <title>Soccer Penalty</title>
    </Head>

<div className="sm:grid grid-cols-12 hh-screen bg-slate-100 gap-x-2">

    <div className="hidden sm:block col-span-2 bg-white">
      {navList.map((x,i)=>(<ul>
        <li className="uppercase p-3 ttext-thin active:bg-slate-100 hover:pl-5 transition duration-700">{x.flag} &nbsp; {x.name}</li>
      </ul>))}
    </div>
    
    <div className="col-span-10 bg-white px-2">
    
      <div className="flex items-center justify-center py-3">
        <div className="mt-3 p-3 rounded-lg grid grid-cols-10 border-3 border-gray-200 shadow-sm bg-white font-bold flex items-center container-sm"> 
        <span className="block col-span-4 text-center">{teams[0].flag} &nbsp; 
        {teams[0].name}</span>
        <h1 className="text-lg text-red-700 mx-2 col-span-2"> (
          {teams[0].points.filter(x=> {
          return x==="WIN"
          }).length} - 
          {teams[1].points.filter(x=> {
          return x==="WIN"
          }).length})
        </h1> 
        <span className="block col-span-4 text-center">
        {teams[1].name} &nbsp; {teams[1].flag} </span>
      </div>
    </div>
    
      {(teams.filter(x=>x.winLossStatus).length)?
      <button 
        className="btn-warning mt-2"
        onClick={()=>{
          setNewTeams(Math.random())
          setTeams(rawData);
          setAutoPlay(true)
        }}>
        Next
      </button>
      : <button className="btn-info shadow-sm mt-2" onClick={()=>setAutoPlay(x=>!x)}>{autoPlay?"PAUSE":"RESUME"}</button>
      }
      <div class="sm:flex justify-between">
      {teams.map((team,i)=>(
        <div className="min-w-[45%] border-1 rounded-lg shadow border-slate-300 p-2 my-3 bg-white">
          <div className="flex items-center py-2">
            {team.flag}
            <h4 className="text-slate-600 font-bold ml-2">{team.name}</h4>
            <div className="ml-auto space-x-2">
             {
             team.winLossStatus && (team.winLossStatus==="WIN"? <span className="text-green-500 text-lg font-bold">{team.winLossStatus}</span> : (team.winLossStatus==="DRAW"? <span className="text-gray-500 text-lg font-bold">{team.winLossStatus}</span> : <span className="text-red-500 text-lg font-bold">{team.winLossStatus}</span>))
             }
            </div>
          </div>
          <hr />
          <div className="mt-4 space-x-4">
            {team.points.map((point,i)=>(
             (point===0)? <div className="inline-block rounded-full h-4 w-4 bg-none ring-1 ring-gray-300"></div> : ((point==="WIN")? <div className="inline-block rounded-full h-4 w-4 bg-green-400 ring-2 ring-green-500"></div> : <div className="inline-block rounded-full h-4 w-4 bg-red-400 ring-2 ring-red-500"></div>)
            ))}
          </div>
        </div>
      ))}
      
      </div>
</div>
</div>
  </>
    )
}



export default memo(App)