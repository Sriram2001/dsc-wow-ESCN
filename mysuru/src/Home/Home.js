import './Home.scss';
import Nav from '../Nav/Nav';

export default function Home() {
    return (
        <>
            <Nav sticky="false" transp="true" />
            <section className="home">
                <div style={{ fontFamily: "'Playfair Display', serif" }}>
                    <h1>Mysuru</h1>
                    <i>Cultural capital of Karnataka</i>
                </div>
            </section>
        </>
    )
}
