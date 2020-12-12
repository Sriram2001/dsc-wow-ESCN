import React from 'react';
import  firebase from "../Components/Firebase/firebase"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import "../QandA/questions.scss"
import Card from '@material-ui/core/Card';

// import { Divider, Header, Image, Segment } from 'semantic-ui-react'

const { useState } = React;


const listStyle = {
    display: "flex",
    alignItems: "space-evenly",
    backgroundColor: "blue($color:  #1e0cb8)",
    justifyContent: "center",
    flexDirection:"column"

}

const ListItemSTyle= {
    display: "flex",
    alignItems: "center",
    backgroundColor: "blue($color:  #1e0cb8)",
    justifyContent: "space-evenly",

}

const divStyle= {
    padding:30,
}

export default class Foo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions_list :[],
            questions_list_id :[]
        }
    }
 
         db = null
    // let [questions_list, setValue] = useState([]);
    // let [questions_list_id, setId] = useState([]);

componentDidMount(){
    const temp1= []
    const temp2 = []
     this.db = firebase.firestore();
    this.db.collection('questions').get().then((snapshot) => {
        snapshot.forEach(doc=>{
            temp1.push(doc.data());
            temp2.push(doc.id);
    })
    this.setState({
        questions_list :temp1,
        questions_list_id :temp2
    });

    })
}
   
handleClick = (id) => {
    console.log(id)
    console.log(this.state.questions_list_id[id])
    const path = `/answer/${this.state.questions_list_id[id]}`
    this.props.history.push(path);
}



render(){

    // if(!this.questions_list_id.length)
    // return null;

    let questions = this.state.questions_list.map((ele, i) => (
        <div style={{padding:10}}>
        <Card>
        <div key ={this.state.questions_list_id[i]} onClick={ () => this.handleClick(i) }>
        <ListItem button >
        <div>
        <div>
        <ListItemText primary={"Q. "+(i+1).toString()+")  "+ele['question']} />
        </div>
        <div style={{fontSize:12,float:"right"}}>
        <div style={{color:"blue"}}> 
        <i>
        {ele['email']}
        </i>
        </div>
        <div style={{color:"red"}}>
        <i>
        {(new Date(ele['date'])).toLocaleString()}
        </i>
        </div>
        </div>
        <div style={{float:"left"}}>
            {/* // button should behere */}
        </div>
        </div>
        </ListItem>
        </div>
        </Card>
       </div>

    ))

 return (
<div style={{backgroundImage: "url(" + "https://papers.co/wallpaper/papers.co-vs20-paint-abstract-background-htc-pink-blue-pattern-41-iphone-wallpaper.jpg" + ")"}} >
<h2 style={{padding:20,display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
Mysore Tourism FAQs
</h2>
 <div >
<div style={divStyle}>
<Card style={{backgroundImage: "url(" + "https://mcdn.wallpapersafari.com/medium/62/26/skDxEZ.jpg" + ")"}}>
<List  style={listStyle}>
    {questions}       
</List>
</Card> 


</div>
</div>
</div>
 )
}
}
