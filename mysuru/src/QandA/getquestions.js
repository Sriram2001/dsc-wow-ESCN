import React from 'react';
import firebase from "../Components/Firebase/firebase"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import "../QandA/questions.scss"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
// import { Divider, Header, Image, Segment } from 'semantic-ui-react'
import './questions.scss';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
const { useState } = React;


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


export default class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions_list: [],
            questions_list_id: []
        }
    }

    db = null
    // let [questions_list, setValue] = useState([]);
    // let [questions_list_id, setId] = useState([]);

    componentDidMount() {
        const temp1 = []
        const temp2 = []
        this.db = firebase.firestore();
        this.db.collection('questions').get().then((snapshot) => {
            snapshot.forEach(doc => {
                temp1.push(doc.data());
                temp2.push(doc.id);
            })
            this.setState({
                questions_list: temp1,
                questions_list_id: temp2
            });

        })
    }

    handleClick = (id) => {
        // console.log(id)
        // console.log(this.state.questions_list_id[id])
        const path = `/answer/${this.state.questions_list_id[id]}`
        this.props.history.push(path);
    }



    render() {

        // if(!this.questions_list_id.length)
        // return null;

        let questions = this.state.questions_list.map((ele, i) => (
            <div style={{ padding: 20 }}>
                <Card>
                    <div key={this.state.questions_list_id[i]} onClick={() => this.handleClick(i)}>
                        <ListItem button >
                            <div>
                                <div>
                                    <ListItemText primary={ele['question']} />
                                </div>
                                <div style={{ fontSize: 12, float: "left", fontFamily: 'Roboto, sans-serif' }}>
                                    <div style={{ color: "#0077cc" }}>
                                        <p>
                                            Asked by {ele['email']}
                                        </p>
                                    </div>
                                    <div style={{ color: "#6a737c" }}>
                                        <p>
                                            {(new Date(ele['date'])).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ float: "left" }}>
                                    {/* // button should behere */}
                                </div>
                            </div>
                        </ListItem>
                    </div>
                </Card>
            </div>

        ))

        return (
            <>
                <Nav sticky="true" transp="false" />
                <div className="forum" >
                    <div className="container">
                        <Card >
                            <div className="forum-head">
                                <Typography variant="h4" gutterBottom>
                                    Forum
                    </Typography>
                                <Link type="button" to="/Q&A">Ask a question</Link>
                            </div>
                            <div >
                                <List style={listStyle}>
                                    {questions}
                                </List>

                            </div>
                        </Card>
                    </div>
                </div>
            </>
        )
    }
}
