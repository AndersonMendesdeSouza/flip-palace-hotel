import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import type { IconName } from '../components/Icon'
import { WhatsAppButton } from '../components/Layout'
import { ImageViewer, Modal } from '../components/Modal'
import RoomCard from '../components/RoomCard'
import { formatPrice, hotel, rooms, whatsappUrl } from '../data/hotel'
import type { Room } from '../data/hotel'

function localDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function AvailabilityForm({ room, onClose }: { room: Room; onClose: () => void }) {
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [guests, setGuests] = useState(room.guests)
  const [error, setError] = useState('')
  const today = localDate(new Date())
  const nextDate = new Date(`${arrival || today}T12:00:00`)
  nextDate.setDate(nextDate.getDate() + 1)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!arrival || !departure || arrival < today || departure <= arrival) {
      setError('Escolha uma entrada a partir de hoje e uma saída posterior à entrada.')
      return
    }
    const formatDate = (value: string) => value.split('-').reverse().join('/')
    const message = `Olá! Gostaria de consultar a disponibilidade do ${room.name} para ${guests} ${guests === 1 ? 'hóspede' : 'hóspedes'}. Entrada: ${formatDate(arrival)}. Saída: ${formatDate(departure)}. Podem confirmar o valor e a disponibilidade?`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <Modal label="Consultar disponibilidade" className="availability-modal" onClose={onClose}>
      <p className="eyebrow">SUA PRÓXIMA ESTADIA</p>
      <h2>Vamos planejar sua visita?</h2>
      <p>Informe as datas e consulte a nossa equipe pelo WhatsApp.</p>
      <form onSubmit={submit}>
        <label>
          Entrada
          <input
            type="date"
            required
            min={today}
            value={arrival}
            onChange={(event) => {
              setArrival(event.target.value)
              setError('')
            }}
          />
        </label>
        <label>
          Saída
          <input
            type="date"
            required
            min={localDate(nextDate)}
            value={departure}
            onChange={(event) => {
              setDeparture(event.target.value)
              setError('')
            }}
          />
        </label>
        <label>
          Hóspedes
          <select value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
            {Array.from({ length: room.guests }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index === 0 ? 'hóspede' : 'hóspedes'}
              </option>
            ))}
          </select>
        </label>
        <div className="availability-summary">
          <Icon name="bed" size={20} />
          <span>{room.name}</span>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="button button-gold">
          <Icon name="whatsapp" size={20} />
          Consultar pelo WhatsApp
        </button>
        <small>A reserva será confirmada diretamente pela equipe do hotel.</small>
      </form>
    </Modal>
  )
}

function RoomContent({ room }: { room: Room }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [availabilityOpen, setAvailabilityOpen] = useState(false)
  const photo = room.photos[photoIndex]
  const roomAmenities: { icon: IconName; label: string }[] = [
    { icon: 'bed', label: room.bed },
    { icon: 'snow', label: 'Ar-condicionado' },
    { icon: 'wifi', label: 'Wi-Fi gratuito' },
    { icon: 'tv', label: 'TV' },
    { icon: 'fridge', label: 'Frigobar' },
  ]
  const details: { icon: IconName; label: string }[] = [
    { icon: 'size', label: `Tamanho: ${room.size} m²` },
    { icon: 'shower', label: 'Banheiro privativo com chuveiro quente' },
    { icon: 'desk', label: 'Mesa de trabalho' },
    { icon: 'hanger', label: 'Guarda-roupa' },
    { icon: 'curtain', label: 'Cortina blackout' },
    { icon: 'plug', label: 'Tomadas 110V / 220V' },
  ]

  function changePhoto(direction: number) {
    setPhotoIndex((photoIndex + direction + room.photos.length) % room.photos.length)
  }

  return (
    <main id="conteudo" tabIndex={-1}>
      <section
        className="detail-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(13, 15, 14, .88), rgba(13, 15, 14, .3)), url('${room.photos[0].src}')`,
        }}
      >
        <div className="container">
          <nav className="breadcrumbs" aria-label="Caminho de navegação">
            <Link to="/">Início</Link>
            <Icon name="right" size={13} />
            <Link to="/" state={{ section: 'quartos' }}>
              Quartos
            </Link>
            <Icon name="right" size={13} />
            <span aria-current="page">{room.name}</span>
          </nav>
          <h1>{room.name}</h1>
          <p>{room.summary}</p>
        </div>
      </section>
      <div className="container details-container">
        <div className="room-top-layout">
          <section className="room-photo-gallery" aria-label={`Fotos do ${room.name}`}>
            <div className="main-room-photo">
              <button
                className="photo-open-button"
                type="button"
                onClick={() => setViewerOpen(true)}
                aria-label="Ampliar foto do quarto"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width="1200"
                  height="850"
                  fetchPriority="high"
                />
              </button>
              <button
                className="round-button photo-prev"
                type="button"
                aria-label="Foto anterior"
                onClick={() => changePhoto(-1)}
              >
                <Icon name="left" />
              </button>
              <button
                className="round-button photo-next"
                type="button"
                aria-label="Próxima foto"
                onClick={() => changePhoto(1)}
              >
                <Icon name="right" />
              </button>
              <span className="photo-count" aria-live="polite">
                {photoIndex + 1} / {room.photos.length}
              </span>
              {photo.illustrative && <span className="photo-disclaimer">Imagem ilustrativa</span>}
              <button
                className="photo-expand"
                type="button"
                aria-label="Ver foto em tela cheia"
                onClick={() => setViewerOpen(true)}
              >
                <Icon name="expand" size={20} />
              </button>
            </div>
            <div className="photo-thumbnails">
              {room.photos.map((item, index) => (
                <button
                  className={photoIndex === index ? 'selected' : ''}
                  key={item.src}
                  type="button"
                  aria-label={`Ver foto ${index + 1}: ${item.alt}`}
                  aria-pressed={photoIndex === index}
                  onClick={() => setPhotoIndex(index)}
                >
                  <img src={item.src} alt="" width="250" height="160" />
                </button>
              ))}
            </div>
          </section>
          <aside className="booking-card">
            <p className="eyebrow">SEU LUGAR PARA DESCANSAR</p>
            <h2>{room.name}</h2>
            <p className="booking-guests">
              <Icon name="users" />
              Até {room.guests} {room.guests === 1 ? 'hóspede' : 'hóspedes'}
            </p>
            <div className="booking-price">
              <span>A partir de</span>
              <strong>{formatPrice(room.price)}</strong>
              <span>por diária</span>
            </div>
            <WhatsAppButton
              message={`Olá! Gostaria de consultar uma reserva para o ${room.name} no Flip Palace Hotel.`}
            />
            <button
              className="button button-outline"
              type="button"
              onClick={() => setAvailabilityOpen(true)}
            >
              <Icon name="calendar" size={21} />
              Consultar disponibilidade
            </button>
            <div className="checkin-info">
              <Icon name="calendar" size={25} />
              <p>
                Check-in: a partir das {hotel.checkIn}
                <br />
                Check-out: até as {hotel.checkOut}
              </p>
            </div>
            <p className="rate-note">Valores ilustrativos sujeitos a confirmação.</p>
          </aside>
        </div>
        <section className="room-overview">
          <div>
            <h2 className="underlined-heading">Sobre o quarto</h2>
            <p>{room.description}</p>
          </div>
          <div>
            <h2 className="underlined-heading">Comodidades do quarto</h2>
            <div className="room-amenities">
              {roomAmenities.map((item) => (
                <div className="amenity" key={item.icon}>
                  <Icon name={item.icon} size={31} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="more-details">
          <div>
            <h2 className="underlined-heading">Mais detalhes</h2>
            <ul>
              {details.map((item) => (
                <li key={item.icon}>
                  <Icon name={item.icon} size={25} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="details-note">
              Características de referência. Confirme a configuração com a recepção.
            </p>
          </div>
          <figure>
            <img
              src="/images/bathroom.jpg"
              alt="Referência ilustrativa de banheiro privativo com chuveiro"
              loading="lazy"
              width="1000"
              height="700"
            />
            <figcaption>Imagem ilustrativa do banheiro</figcaption>
          </figure>
        </section>
        <section className="other-rooms">
          <h2 className="underlined-heading">Outros quartos</h2>
          <div className="room-grid">
            {rooms
              .filter((item) => item.slug !== room.slug)
              .map((item) => (
                <RoomCard key={item.slug} room={item} showPrice />
              ))}
          </div>
        </section>
      </div>
      {viewerOpen && (
        <ImageViewer
          photos={room.photos}
          index={photoIndex}
          onChange={setPhotoIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
      {availabilityOpen && (
        <AvailabilityForm room={room} onClose={() => setAvailabilityOpen(false)} />
      )}
    </main>
  )
}

export default function RoomDetails() {
  const { slug } = useParams()
  const room = rooms.find((item) => item.slug === slug)

  useEffect(() => {
    document.title = room
      ? `${room.name} | Flip Palace Hotel`
      : 'Quarto não encontrado | Flip Palace Hotel'
  }, [room])

  if (!room)
    return (
      <main id="conteudo" tabIndex={-1} className="container not-found">
        <p className="eyebrow">HOSPEDAGEM</p>
        <h1>Quarto não encontrado</h1>
        <p>Conheça as acomodações disponíveis para sua estadia.</p>
        <Link className="button button-gold" to="/" state={{ section: 'quartos' }}>
          Conhecer os quartos
        </Link>
      </main>
    )

  return <RoomContent key={room.slug} room={room} />
}
