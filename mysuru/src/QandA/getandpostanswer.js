import React from 'react';
import firebase from "../Components/Firebase/firebase"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import "../QandA/questions.scss"
// import { Divider, Header, Image, Segment } from 'semantic-ui-react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './style.css';
import NavigationIcon from '@material-ui/icons/Navigation';

const { useState } = React;

const useStyles2 = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const listStyle = {
  display: "flex",
  alignItems: "space-evenly",
  backgroundColor: "blue($color:  #1e0cb8)",
  justifyContent: "center",
  flexDirection: "column"

}

const ListItemSTyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "blue($color:  #1e0cb8)",
  justifyContent: "space-evenly",

}

const divStyle = {
  padding: 30,

}

export default class Getanswer extends React.Component {


  questionid = null

  classes2 = useStyles;


  constructor(props) {
    super(props);
    this.questionid = this.props.match.params.id
    console.log(this.questionid)
    this.state = {
      answers_list: [],
      answers_list_id: [],
      question: null,
      visible: true,
      email: "",
      answer: "",
      valid: true

    }
  }

  classes = useStyles;


  handleChange = (e) => {
    //  console.log(e)
    if (e.target.id === 'email') {
      this.setState({ email: e.target.value });
    }

    else if (e.target.id === 'answer') {
      this.setState({ answer: e.target.value });
    }
    console.log(this.state.answer)
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(this.state.email) && (this.state.answer.trim()) && this.state.answer.length > 10) {
      this.setState({ valid: false })
    }
    else {
      this.setState({ valid: true })
    }

  }

  addAnswer = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    return db.collection("answers").add({
      email: this.state.email,
      answer: this.state.answer,
      questionid: this.questionid,
      date: Date.now(),
    })
      .catch(err => {

        this.setState({
          visible: false,
          email: "",
          answer: "",
          valid: true
        })
        window.location.reload();
        console.log(err)
      }).then(data => {
        this.setState({
          visible: false,
          email: "",
          answer: "",
          valid: true
        })
        window.location.reload();
      });



  }

  db = null

  componentDidMount() {
    const temp1 = []
    const temp2 = []


    this.db = firebase.firestore();

    // get 

    this.db.collection('questions')
      .doc(this.questionid)
      .get()
      .then(doc => {
        console.log(doc.data())
        this.setState({
          question: doc.data()['question']
        })
      });




    this.db.collection('answers').get().then((snapshot) => {
      snapshot.forEach(doc => {
        if (doc.data()['questionid'] == this.questionid) {
          temp1.push(doc.data());
          temp2.push(doc.id);
        }
      })
      this.setState({
        answers_list: temp1,
        answers_list_id: temp2
      });

    })
  }


  render() {




    let question = (
      <Typography component="h6" variant="h6" style={{ padding: "20px" }}>
        {this.state.question}
      </Typography>
      // <div style={{ padding: 20, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      //   <Tooltip style={{ textTransform: 'none', textAlign: "left" }} title="Question" interactive  >
      //     <Button >{this.state.question}</Button>
      //   </Tooltip> 

      // </div>
    )


    let part = this.state.visible && (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ padding: 20, fontFamily: "fantasy !important" }} className={this.classes.paper}>

        <Typography component="h4" variant="h5">
          Write Your Answer
      </Typography>
        <form className={this.classes.form} validate="true">
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
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="answer"
            label="answer"
            type="text"
            id="answer"
            autoComplete="answer"
            value={this.state.answer}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.classes.submit}
            onClick={this.addAnswer}
            disabled={this.state.valid}
          >
            Post Your Answer
        </Button>

        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    )

    let answers = this.state.answers_list.map((ele, i) => (
      <div style={{ padding: 10 }} key={this.state.answers_list_id[i]}>
        <Card>
          <ListItem button >
            <div>
              <div>
                <ListItemText primary={(i + 1).toString() + ")  " + ele['answer']} />
              </div>
              <div style={{ fontSize: 12, float: "right" }}>
                <div style={{ color: "blue" }}>
                  <i>
                    {ele['email']}
                  </i>
                </div>
                <div style={{ color: "red" }}>
                  <i>
                    {(new Date(ele['date'])).toLocaleString()}
                  </i>
                </div>
              </div>
              <div style={{ float: "left" }}>
                {/* // button should behere */}
              </div>
            </div>
          </ListItem>
        </Card>
      </div>
    ))

    return (
      // <div style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/mysurutourism-7df77.appspot.com/o/Trianglify%20%E2%80%93%20Generate%20colorful%20triangle%20meshes%20for%20SVG%20images%20and%20CSS%20backgrounds%20_%20Productivity%20Tools%20_%20Designify.jpeg?alt=media&token=d1bc601a-61f4-47c6-ab3b-71e577ace45a)` }}>
      <div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>

          <div style={{ padding: 20, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <Card>
              {question}
              {part}
            </Card>

          </div>
          {/* <div style={{ padding: 20, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <Card >
              
            </Card>
          </div> */}

          <h2 style={{ padding: 20, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            Answers</h2>
          <div >
            <div style={divStyle}>
              <Card >
                <List style={listStyle}>
                  {answers}
                </List>
              </Card>



            </div>
          </div>
        </div>

      </div>
    )
  }
}
