import firebase from '../Components/Firebase/firebase';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import './Places.scss';
// import getDistance from 'geolib/es/getDistance';
// import Carousel, { Dots } from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';


export const Place = ({ match }) => {
    const { params: { Id } } = match;

    const [data, setData] = useState({});

    const [value, setValue] = useState(0);

    const onChange = value => {
        setValue(value);
    }



    useEffect(() => {
        const db = firebase.firestore();
        db.collection('Places').doc(Id)
            .get().then(ss => {
                const dt = ss.data();
                setData(dt);
            })
            .catch(err => console.log(err));


    }, []);

    return (
        <>
            <Nav sticky="true" transp="false" />
            <div className="place container">
                <h1>{data.name}</h1>
                <img src={data.imageUrl} alt={data.name} />
                <p>{data.description}</p>
            </div>
        </>

    )
}