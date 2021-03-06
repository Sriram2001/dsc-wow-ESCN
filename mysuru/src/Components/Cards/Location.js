import './Location.scss';
import { Link } from 'react-router-dom';

export default function Location({ location }) {
    return (
        <article className="loc-card">
            <div className="loc-card__info-hover">
                <p>{location.description}</p>
            </div>
            <div className="loc-card__img loc-card-img" data-lazy={location.imageUrl}></div>
            <div className="loc-card__img--hover loc-card-img"></div>
            <div className="loc-card__info">
                <span className="loc-card__category">{location.type}</span>
                <h3 className="loc-card__title">{location.name}</h3>
                <span className="loc-card__by">
                    <Link className="loc-card__author" to={`/place/${location.Id}`}>More Details</Link>
                </span>
            </div>
        </article>

    )
}
