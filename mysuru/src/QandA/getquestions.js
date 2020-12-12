import React from 'react';
import  firebase from "../Components/Firebase/firebase"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import "../QandA/questions.scss"
const { useState } = React;

export default function Question() {

   
    const db = firebase.firestore();
    const volunteer_list = [];
    const volunteer_list_id = []

    db.collection('volunteers').get().then((snapshot) => {
        snapshot.forEach(doc=>{
            
            volunteer_list.push(doc.data());
            volunteer_list_id.push(doc.id);
    })
    console.log(volunteer_list);
    console.log(volunteer_list_id)
    
    })


   

        return (
<div>
 <List >
  <ListItem button>
    <ListItemText primary="Inbox" />
  </ListItem>
  <Divider />
  <ListItem button divider>
    <ListItemText primary="Drafts" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Trash" />
  </ListItem>
  <Divider light />
  <ListItem button>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
                </div>
          );
      
   }









