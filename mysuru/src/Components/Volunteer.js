import { useState } from 'react';
import VolunteerService from "../Services/Volunteer"
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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


export default function User() {

  const classes = useStyles();


  let [firstname, setFirstname] = useState('');
  let [lastname, setLastname] = useState('')
  let [email, setEmail] = useState('');
  let [place, setPlace] = useState('')
  let [phone, setPhone] = useState('')
  let [description, setDesc] = useState('')


  const handleChange = (e) => {
    //  console.log(e)
    if (e.target.id === 'firstname') {
      setFirstname(e.target.value);
    }
    else if (e.target.id === 'lastname') {
      setLastname(e.target.value);
    }
    else if (e.target.id === 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.id === 'place') {
      setPlace(e.target.value);
    }
    else if (e.target.id === 'phone') {
      setPhone(e.target.value);
    }
    else if (e.target.id === 'desc') {
      setDesc(e.target.value);
    }
  }






  const addUser = (e) => {
    e.preventDefault()


    const state = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      place: place,
      phone: phone,
      description: description
    };
    VolunteerService.adduser(state).catch(err => {
      setFirstname("")
      setLastname("")
      setEmail("")
      setPlace("")
      setPhone("")
      setDesc("")
      console.log(err)
    }).then(data => {
      setFirstname("")
      setLastname("")
      setEmail("")
      setPlace("")
      setPhone("")
      setDesc("")
      console.log(data)
    });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Sign up As a Volunteer
        </Typography>
        <form className={classes.form} validate="true" onSubmit={addUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastName"
                autoComplete="lastname"
                value={lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="place"
                label="Place "
                name="place"
                type="text"
                autoComplete="Place"
                value={place}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="phone"
                type="tel"
                id="phone"
                autoComplete="current-phone"
                value={phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="desc"
                label="description"
                type="text"
                id="desc"
                autoComplete="description"
                value={description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addUser}
          >
            Sign Up
          </Button>

        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );

}









// {/* <form onSubmit={this.addUser}>
// <input
//   type="text"
//   name="fullname"
//   placeholder="Full name"
//   onChange={this.updateInput}
//   value={this.state.fullname}
// />
// <input
//   type="email"
//   name="email"
//   placeholder="email"
//   onChange={this.updateInput}
//   value={this.state.email}
// />
//   <button type="submit">Submit</button>
// </form> */}