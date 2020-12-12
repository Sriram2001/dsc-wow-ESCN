import firebase from '../Components/Firebase/firebase';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import './Places.scss';
// import getDistance from 'geolib/es/getDistance';
// import Carousel, { Dots } from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';


export const Place = ({ match }) => {
    const {
        params: { Id },
    } = match;

    console.log(Id);

    const [data, setData] = useState({});

    const [value, setValue] = useState(0);

    const onChange = value => {
        setValue(value);
    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    useEffect(() => {
        const db = firebase.firestore();
        db.collection('Places').doc(Id)
            .get().then(ss => {
                const dt = ss.data();
                setData(dt);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // const d = getDistance(position.coords, {
                        //     latitude: dt.location.d_,
                        //     longitude: dt.location.w_
                        // });
                        // console.log(d);
                        // console.log(
                        //     'You are ',
                        //     calcCrow(position.coords.latitude, position.coords.longitude, dt.location.d_, dt.location.w_),
                        //     'kilo meters away from 51.525, 7.4575'
                        // );
                    })
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
            {/* <Carousel
                value={value}
                onChange={onChange}
            >
                <img className="img-example" src={someImage} />
        ...
        <img className="img-example" src={anotherImage} />
            </Carousel>
            <Dots
                value={this.state.value}
                onChange={this.onChange}
                thumbnails={[
                    (<img key={1} className="img-example-small" src={abstractImage} />),
                    ...
                    (<img key={12} className="img-example-small" src={transportImage} />),
                ]}
            /> */}
        </>

    )
}