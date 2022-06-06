import React, {memo, useMemo, useState, useEffect} from "react";
import axios from "axios"
import Head from "next/head"
import random from "random"
import Paper from "@mui/material/Paper"
import {useTheme} from "@mui/material/styles"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Grid from "@mui/material/Grid"
import Fab from "@mui/material/Fab"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import validator, {unescape, escape} from "validator"
import {questionsObj} from "../components/QuestionsObj"

function App(props){
  const theme = useTheme()
  const [qNum, setQNum] = useState(0);
  const [points, setPoints] = useState(0);
  const [allowNextClick, setAllowNextClick] = useState(false);
  const [answered, setAnswered] = useState({
    bool: false,
    clickedIndex: NaN
  })
  const questions = props.questions ?? questionsObj;
  const results = questions.results;
  
  const result = results[qNum];
  
  const answers = useMemo(()=>{
    let x = [...result.incorrect_answers];
    x.splice(random.int(0,3), 0, result.correct_answer);
    x.sort((a,b)=>Math.random()-0.5);
    return x;
  }, [qNum]);
  
  const handleAnswerClick = (i, val)=>{
    if(answered.bool) return;
    if(val.toLowerCase() === result.correct_answer.toLowerCase()){
      setPoints(x=>++x)
    }
    setAnswered(obj=>({
      ...obj,
      bool: true,
      clickedIndex: i
    }));
    setAllowNextClick(true)
  }
  
  const handleNavigation = (type) =>{
    if(!allowNextClick) {
      return;
    }
    setAllowNextClick(false)
    setQNum(x=>{
      setAnswered(obj=>({
        ...obj,
        bool: false,
      }))
      if(type==="next" && x>=results.length-1){
        return 0
      }
      else if(type==="next"){
        return ++x
      }
      else if(x<=0){
      return results.length-0
      }
      return --x
    });
  };
  
  const getHexColor = useMemo(()=>{
    const color = ()=>(`#${random.int(0,9)}${random.int(0,9)}${random.int(0,9)}`)
    return [...Array(4)].map(x=>color())
  }, [qNum])
  
  return (
  <>
    <Head>
      <title>Quiz</title>
    </Head>
    
    <Typography variant="h5" component="h1" align="center" margin="30px 0 5px">QUIZ</Typography>
  <Typography variant="h6">
  Difficulty: {result.difficulty}
  </Typography>
    <Paper sx={{p:2, mb:1, display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" color="success.main">
        Points: ({points})
      </Typography>
      <Typography variant="h6" color="secondary">
        {qNum+1}/{results.length}
      </Typography>
    </Paper>
    
<Paper sx={{p:4}}>
    
  <Box display="flex" justifyContent="flex-end" sx={{mb:1}}>
    <Fade in={allowNextClick} timeout={800} >
      <Fab 
        onClick={()=>handleNavigation("next")}
        {...{
          color:"primary",
          size: "small",
        }}
        variant="extended"
        >
        Next Question
      </Fab>
    </Fade>
  </Box>
      <Typography variant="h6" color="info" sx={{mb:2}} fontWeight="bold">
        {result.category}
      </Typography>
      <Typography fontSize="16px">
        {unescape(result.question).replace(/&[^&;]+;/g, "'")}
      </Typography>
      <Divider sx={{my:3}}/>
      <Grid container spacing={2}>
        {answers.map((val,i)=>(
          <Grid key={i} item xs={12} sm={6}>
            <Paper
              sx={{
                width:"100%", 
                display:"flex",
                alignItems: "center",
                userSelect:"none",
                borderRadius: 999,
                py:1, px:1,
                transition: "0.2s",
                ...(answered.bool? 
                  {
                    backgroundColor: (answered.clickedIndex===i)? 
                    ((val.toLowerCase() === result.correct_answer.toLowerCase())? "#8f8":"#f88") : ""
                  } : {
                  "&:hover": {
                    transform: "scale(1.05)"
                  },
                  "&:active": {
                    backgroundColor:"#8ac"
                  }
                }),
                ...((answered.bool && answered.clickedIndex!==i && val.toLowerCase() === result.correct_answer.toLowerCase())? 
                    {
                      animation: "answer 0.7s infinite"
                    } : {}
                ),
              }}
              onClick={()=>{
                handleAnswerClick(i, val);
              }}
            >
              <Avatar sx={{bgcolor: getHexColor[i], mr:3}}>
                {i===0&&"A"||i===1&&"B"||i===2&&"C"||i===3&&"D"}
              </Avatar>
              {unescape(val).replace(/&[^&;]+;/g, "'")}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </>)
}


export async function getServerSideProps({req}){
 // console.log(req.questions)
  return ({
    props: {
      cookies: req.cookies,
      questions: req.questions
    }
  })
}

export default memo(App)