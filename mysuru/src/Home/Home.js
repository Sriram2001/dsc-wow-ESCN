import './Home.scss';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default function Home() {
    return (
        <>
            <Nav sticky="false" transp="true" />
            <section className="home">
                <div style={{ fontFamily: "'Playfair Display', serif" }}>
                    <Fade bottom cascade>
                        <h1>Mysuru</h1>
                        <p>Cultural capital of Karnataka</p>
                    </Fade>
                </div>
            </section>
            <section className="about">
                <div>
                    <Fade left>
                        <p className='about-ind about-big'>
                            Mysuru, the the princely city of palaces, people and smells is worth a visit whatever the month or season. Mysuru is a dream city that never lets down the visitors with its clean, light and easygoing environment.
                        </p>
                    </Fade>
                    <Fade right>
                        <p className="about-ind">
                            Steeped in tradition, Mysuru is located at the epicenter of Indian history, culture, and timeless elegance. The city of Mysuru, once the capital of the former mysuru state, is now the cultural and tourist center of the expanded Karnataka State.
                        </p>
                        <p className="about-ind">
                            Come visit Mysuru to experience the rich history and tradition awaiting you...
                        </p>
                    </Fade>
                    <Fade bottom>
                        <Link type="button" to="/places">Explore Places</Link>
                    </Fade>
                </div>
            </section>
        </>
    )
}
