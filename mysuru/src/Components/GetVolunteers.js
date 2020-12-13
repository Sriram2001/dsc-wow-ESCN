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
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
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
      <Nav sticky="true" transp="false" />
      <div className="guide">
        <Card className="container">
          <h1>Guides</h1>
          <p>
            We know it. Visiting a new place can be tough. Especially with a place like Mysuru full of rich tradition and heritage. Planning your travel, listing out places to visit, places to stay, places to eat, and much more can get really confusing really quickly.
          </p>
          <p>
            Fear not! Download the free <a href="#" style={{ color: "#f58026" }}>Mysuru tour guide</a> with city maps, round ups about popular tourist attractions and much more.
          </p>
          <p>Incase you get lost looking at the endless possibilities or want any general help, feel free to contact one of the volunteers who will be willing to help you.</p>
          <h2>
            Volunteers you can reach out to:
          </h2>
          <div className="guide-cards">
            {volunteer_list.map((p, idx) => {
              return (
                <Card className={`${classes.root} guide-card`}>
                  {p.verified && <p className="verified"><VerifiedUserIcon style={{ fontSize: "13px", marginRight: "3px" }} />Verified</p>}
                  <CardContent>
                    <Typography  >
                      <h4> {p.name}</h4>
                    </Typography>
                    <Typography style={{ color: "black" }} className={classes.pos} >
                      <i>{p.place}</i>
                    </Typography>
                    <Typography className={classes.title} color="black" gutterBottom>
                      Ph. <b>{p.phone}</b>
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {p.email}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <p>
                        {p.description}
                      </p>
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Card>
      </div>
    </>
  )
}
