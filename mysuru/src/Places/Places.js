import Card from '../Components/Cards/Location';
import './Places.scss';
import firebase from '../Components/Firebase/firebase';
import { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';

export default function Places() {
    const [places, setPlaces] = useState([]);
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    const imgs = entry.target.getElementsByClassName('loc-card-img');
                    const src = imgs[0].getAttribute('data-lazy');
                    console.log(imgs)
                    imgs[0].style.backgroundImage = `url(${src})`;
                    imgs[1].style.backgroundImage = `url(${src})`;
                    observer.disconnect();
                }
            });
        });

        io.observe(target)
    };

    useEffect(() => {
        const db = firebase.firestore();
        db.collection('Places').get()
            .then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    setPlaces([]);
                } else {
                    setPlaces(querySnapshot.docs.map(d => {
                        return {
                            ...d.data(),
                            Id: d.id
                        }
                    }));
                }
                const targets = document.querySelectorAll('.loc-card');
                targets.forEach(lazyLoad);
            });
    },[])

    return (
        <>
            <Nav sticky="true" transp="false" />
            <div className="places container">
                <h1>Explore Locations in Mysuru</h1>
                <div className="places-cards">
                    {places.map((p, idx) => <Card key={idx} location={p} />)}
                </div>
            </div>
        </>
    )
}
