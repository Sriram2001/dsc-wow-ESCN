import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './volunteer.scss';
import Card from '@material-ui/core/Card';
import Nav from '../Nav/Nav';
import { useEffect, useState } from 'react';
import firebase from '../Components/Firebase/firebase';

import VolunteerService from "../Services/Volunteer"

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


export default function GetVolunteers() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [volunteer_list, setVolunteer] = useState([]);
    useEffect(() => {
        const db = firebase.firestore();
        db.collection('volunteers').get()
            .then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    setVolunteer([]);
                } else {
                    setVolunteer(querySnapshot.docs.map(d => {
                        return {
                            ...d.data(),
                            Id: d.id
                        }
                    }));
                }
            });
    }, [])

    return (
        <>
        <div className="places container" style={{padding:20}}>
        <h1>Volunteers You Can reach Out</h1>
        <div className="places-cards">
            {volunteer_list.map((p, idx) => 
    <Card className={classes.root} style={{backgroundColor:"lightgoldenrodyellow"}}>
      <CardContent>
        <Typography  >
         <h4> {p['name']}</h4>
        </Typography>
        <Typography style={{color:"black"}} className={classes.pos} >
          <i>{p['place']}</i>
        </Typography>
        <Typography className={classes.title} color="black" gutterBottom>
          Ph. <b>{p['phone']}</b>
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {p['email']}
        </Typography>
        <Typography variant="body2" component="p">
         <p>
             {p['description']}
         </p>
        </Typography>
        <br></br>
 
      </CardContent>
    </Card>)}
        </div>
    </div>
    </>  
)
}


