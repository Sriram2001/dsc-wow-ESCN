import firebase from '../Components/Firebase/firebase';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import './Places.scss';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import getDistance from 'geolib/es/getDistance';
// import Carousel, { Dots } from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';


export const Place = ({ match }) => {
    const { params: { Id } } = match;

    const [data, setData] = useState({});

    useEffect(() => {
        const db = firebase.firestore();
        db.collection('Places').doc(Id)
            .get().then(ss => {
                const dt = ss.data();
                setData(dt);
                console.log(dt)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <Nav sticky="true" transp="false" />
            <div className="place">
                <div className="container">
                    <Card className="image" style={{ backgroundImage: `url(${data.imageUrl})` }} />
                    <Card className="place-card">
                        <div>
                            <Typography variant="h3" gutterBottom>
                                {data.name}
                            </Typography>
                            <Divider style={{ marginBottom: "25px" }} />
                            <Typography variant="body1" gutterBottom>
                                {data.description}
                            </Typography>
                        </div>
                    </Card>
                    {/* <h1>{data.name}</h1> */}
                    {/* <img src={data.imageUrl} alt={data.name} /> */}
                    {/* <p>{}</p> */}
                </div>
            </div>
        </>

    )
}