import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import  firebase from "../Components/Firebase/firebase"

const { useState } = React;

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/mysurutourism-7df77.appspot.com/o/Mysore%20Palace%20India%20Wallpaper%20_%20OZZ%20HD%20Wallpaper.jpeg?alt=media&token=2e76aece-c602-4b7b-9cf5-27edf0ddf93b)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

export default function Question() {

   const classes = useStyles();
   

   let [email, setEmail] = useState('');
   let [question,setQues] = useState('')
   let [isvalid,setValid] = useState(true)

   const handleChange = (e) => {
    //  console.log(e)
     if(e.target.id === 'email')
     {  
        setEmail(e.target.value);
     }

     else if(e.target.id === 'question')
     {
        setQues(e.target.value);
     }
     console.log(question)
     let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regEmail.test(email) && (question.trim()) && question.length>10){
            setValid(false)
        }
        else
        {
            setValid(true)
        }

   }


      
    


      const addquestion = (e) =>{
        e.preventDefault()
        
   


         const db = firebase.firestore();
         return db.collection("questions").add({
             email: email,
             question:question ,
             date:Date.now(),
             answer:""
         })
        .catch(err=>{
          setEmail("")
          setQues("")
          setValid(true)

          console.log(err)
      }).then(data=>{
        setEmail("")
        setQues("")
        setValid(true)

          console.log(data)
      }); ;


       
      }


        return (
            <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid item xs={false} sm={4} md={7} className={classes.image} />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper} style={{paddingTop:100}}>
         
                  <Typography component="h1" variant="h5">
                    Ask a question
                  </Typography>
                  <form className={classes.form} validate = "true">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      type={"email"}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email} 
                     onChange={handleChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      rows={4}
                      name="question"
                      label="question"
                      type="text"
                      id="question"
                      autoComplete="question"
                      value={question} 
                      onChange={handleChange}
                    />
               
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isvalid}
                      className={classes.submit}
                      onClick = {addquestion}
                    >
                    Post Your Question
                    </Button>
                 
                   
                  </form>
                </div>
              </Grid>
            </Grid>
          );
      
   }









