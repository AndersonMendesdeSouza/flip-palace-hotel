import { Link } from 'react-router-dom'
import { formatPrice } from '../data/hotel'
import type { Room } from '../data/hotel'
import Icon from './Icon'

export default function RoomCard({ room, showPrice = false }: { room: Room; showPrice?: boolean }) {
  return (
    <article className="room-card">
      <Link
        className="room-card-image"
        to={`/quartos/${room.slug}`}
        aria-label={`Ver detalhes do ${room.name}`}
      >
        <img
          src={room.photos[0].src}
          alt={room.photos[0].alt}
          loading="lazy"
          width="640"
          height="420"
        />
        <span className="image-label">Imagem ilustrativa</span>
      </Link>
      <div className="room-card-content">
        <Link to={`/quartos/${room.slug}`}>
          <h3>{room.name}</h3>
        </Link>
        {!showPrice && <p>{room.summary}</p>}
        <div className="room-card-info">
          <span>
            <Icon name="user" size={16} />
            {room.guests} {room.guests === 1 ? 'hóspede' : 'hóspedes'}
          </span>
          {!showPrice && (
            <>
              <span>
                <Icon name="wifi" size={17} />
                Wi-Fi
              </span>
              <span>
                <Icon name="snow" size={15} />
                Ar-condicionado
              </span>
            </>
          )}
          {showPrice && (
            <div className="card-price">
              <small>A partir de</small>
              <strong>{formatPrice(room.price)}</strong>
            </div>
          )}
        </div>
        <Link className="button button-outline room-details-link" to={`/quartos/${room.slug}`}>
          Ver detalhes
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </article>
  )
}
