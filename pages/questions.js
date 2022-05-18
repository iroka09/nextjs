import React, {memo, useMemo, useState, useEffect} from "react";
import axios from "axios"
import random from "random"
import Paper from "@mui/material/Paper"
import {useTheme} from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Fab from "@mui/material/Fab"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import validator, {unescape, escape} from "validator"

const colorArray = "primary, secondary, error, warning, info".split(", ")



function App({questionsObj}){
  const theme = useTheme()
  const [qNum, setQNum] = useState(0);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [answered, setAnswered] = useState({
    bool: false,
    clickedIndex: NaN
  })
  const results = questionsObj.results;
  
  const result = results[qNum];
  
  const answers = useMemo(()=>{
    let x = [...result.incorrect_answers];
    x.splice(random.int(0,3), 0, result.correct_answer);
    return x;
  }, [qNum]);
  
  const handleAnswerClick = (i)=>{
    if(answered.bool) return
    setAnswered(obj=>({
      ...obj,
      bool: true,
      clickedIndex: i
    }))
  }
  
  const handleNavigation = (type)=>{
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
    <Paper sx={{p:2, my:2, display:"flex"}}>
      <Typography variant="h6" sx={{ml:"auto"}} color="secondary">
        {qNum+1}/{results.length}
      </Typography>
    </Paper>
    <Paper sx={{p:4, userSelect:"none", animationName: "answer",
      animationDuration: "2s",}}>
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
                alignItems: "center",
                borderRadius: 999,
                display:"flex",
                py:1, px:1,
                transition: "0.3s",
                ...(answered.bool? 
                  {
                    backgroundColor: (answered.clickedIndex===i)? 
                    ((val.toLowerCase() === result.correct_answer.toLowerCase())? "green":"red") : ""
                  } : {
                  "&:hover": {
                    transform: "scale(1.04)"
                  },
                  "&:active": {
                    backgroundColor:"#8ac"
                  }
                }),
                ...((answered.bool && answered.clickedIndex!==i && val.toLowerCase() === result.correct_answer.toLowerCase())? 
                    {
                      animationName: "answer",
                      animationDuration: "2s",
                    } : {}
                ),
              }}
              onClick={()=>handleAnswerClick(i)}
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
    {answered.bool &&
    <Box display="flex" justifyContent="flex-end" marginTop="20px">
      <Fab 
        onClick={()=>handleNavigation("next")}
        color="secondary"
        variant="extended">
        Next Question
      </Fab>
    </Box>
    }
  </>)
}


export async function getServerSideProps({req}){
 // console.log(req.questions)
  return ({
    props: {
      title: "Who wants to be a millionaire",
      cookies: req.cookies,
      questionsObj: req.questions,
    }
  })
}

export default memo(App)