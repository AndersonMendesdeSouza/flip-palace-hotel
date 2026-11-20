import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { WhatsAppButton } from '../components/Layout'
import { ImageViewer } from '../components/Modal'
import RoomCard from '../components/RoomCard'
import { amenities, gallery, hotel, rooms } from '../data/hotel'

export default function Home() {
  const roomsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeRoom, setActiveRoom] = useState(0)
  const [showAmenities, setShowAmenities] = useState(false)
  const [showRestaurant, setShowRestaurant] = useState(false)
  const [photoIndex, setPhotoIndex] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Flip Palace Hotel | Sua estadia em Buriti Alegre'
  }, [])

  function goToRoom(index: number) {
    const room = roomsRef.current?.children[index] as HTMLElement | undefined
    if (room && roomsRef.current) {
      roomsRef.current.scrollTo({
        left: room.offsetLeft - roomsRef.current.offsetLeft,
        behavior: 'smooth',
      })
    }
  }

  function moveGallery(direction: number) {
    const track = galleryRef.current
    if (!track) return
    const photo = track.firstElementChild as HTMLElement | null
    if (!photo) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = photo.offsetWidth + gap
    if (direction > 0 && track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction < 0 && track.scrollLeft <= 5) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: direction * step, behavior: 'smooth' })
    }
  }

  return (
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="home-hero">
        <img
          className="hero-background"
          src="/images/hotel-banner.png"
          alt="Fachada do Flip Palace Hotel com letreiro amarelo e entrada azul"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="hero-welcome">Bem-vindo ao</p>
          <h1>
            Flip Palace
            <br />
            Hotel
          </h1>
          <p className="hero-location">
            <Icon name="pin" size={21} />
            Buriti Alegre · Goiás
          </p>
          <p className="hero-description">
            Conforto, praticidade e a melhor
            <br className="desktop-break" /> hospedagem da região.
          </p>
          <div className="hero-actions">
            <WhatsAppButton />
            <a
              className="button hero-directions"
              href={hotel.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="pin" size={20} />
              Como chegar
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <p className="hero-note">Sinta-se em casa, mesmo longe de casa.</p>
        </div>
        <div className="hero-amenities">
          <div className="container hero-amenities-inner">
            {[
              { icon: 'bed' as const, label: 'Quartos confortáveis' },
              { icon: 'utensils' as const, label: 'Restaurante no local' },
              { icon: 'wifi' as const, label: 'Wi-Fi gratuito' },
              { icon: 'car' as const, label: 'Estacionamento seguro' },
              { icon: 'snow' as const, label: 'Ar-condicionado nos quartos' },
            ].map((item) => (
              <div key={item.icon}>
                <Icon name={item.icon} size={29} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quartos" className="section rooms-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">HOSPEDAGEM</p>
            <h2>Nossos quartos</h2>
            <p>Acomodações aconchegantes para a sua melhor experiência.</p>
          </div>
          <div className="rooms-carousel">
            <div
              className="room-grid home-room-grid"
              ref={roomsRef}
              onScroll={(event) => {
                const track = event.currentTarget
                const first = track.firstElementChild as HTMLElement | null
                if (first) setActiveRoom(Math.round(track.scrollLeft / (first.offsetWidth + 20)))
              }}
            >
              {rooms.map((room) => (
                <RoomCard key={room.slug} room={room} />
              ))}
            </div>
            <button
              className="round-button room-prev mobile-only"
              type="button"
              aria-label="Quarto anterior"
              onClick={() => goToRoom((activeRoom + rooms.length - 1) % rooms.length)}
            >
              <Icon name="left" size={19} />
            </button>
            <button
              className="round-button room-next mobile-only"
              type="button"
              aria-label="Próximo quarto"
              onClick={() => goToRoom((activeRoom + 1) % rooms.length)}
            >
              <Icon name="right" size={19} />
            </button>
          </div>
          <div className="carousel-dots mobile-only" aria-label="Escolher quarto">
            {rooms.map((room, index) => (
              <button
                key={room.slug}
                className={activeRoom === index ? 'active' : ''}
                type="button"
                aria-label={`Mostrar ${room.name}`}
                aria-pressed={activeRoom === index}
                onClick={() => goToRoom(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="restaurante" className="restaurant-section">
        <div className="container restaurant-layout">
          <div className="restaurant-photo">
            <img
              src="/images/restaurant-wide.jpg"
              alt="Restaurante do Flip Palace Hotel, com mesas e cadeiras preparadas para receber hóspedes"
              loading="lazy"
              width="773"
              height="573"
            />
            <div className="photo-tag">
              <Icon name="utensils" size={18} />
              Sabor de estar em casa
            </div>
          </div>
          <div className="restaurant-copy">
            <p className="eyebrow">GASTRONOMIA</p>
            <h2>
              Uma boa estadia
              <br />
              começa à mesa.
            </h2>
            <p>
              Comece o dia com um delicioso café da manhã e aproveite nossas refeições com sabor
              caseiro e qualidade.
            </p>
            <ul className="check-list">
              <li>
                <Icon name="check" size={18} />
                Café da manhã completo
              </li>
              <li>
                <Icon name="check" size={18} />
                Refeições variadas
              </li>
              <li>
                <Icon name="check" size={18} />
                Um ambiente acolhedor
              </li>
            </ul>
            <button
              className="button button-gold"
              type="button"
              aria-expanded={showRestaurant}
              aria-controls="restaurant-information"
              onClick={() => setShowRestaurant(!showRestaurant)}
            >
              {showRestaurant ? 'Ver menos' : 'Conhecer o restaurante'}
              <Icon name="arrow" size={17} />
            </button>
            {showRestaurant && (
              <div id="restaurant-information" className="restaurant-information">
                <h3>À mesa, você é de casa.</h3>
                <p>
                  Nosso restaurante é um convite para começar o dia com calma e aproveitar os
                  sabores da sua viagem. Consulte a equipe para saber os horários, o cardápio e as
                  opções disponíveis durante sua estadia.
                </p>
                <a href={hotel.phoneLink}>Falar com a recepção: {hotel.phone}</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="comodidades" className="section amenities-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">COMODIDADES</p>
            <h2>Tudo o que você precisa</h2>
            <p>Pequenos cuidados que fazem toda a diferença.</p>
          </div>
          <div
            id="hotel-amenities"
            className={`amenities-grid ${showAmenities ? 'is-expanded' : ''}`}
          >
            {amenities.map((item) => (
              <div className="amenity" key={item.icon}>
                <Icon name={item.icon} size={32} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <button
            className="show-more mobile-only"
            type="button"
            aria-expanded={showAmenities}
            aria-controls="hotel-amenities"
            onClick={() => setShowAmenities(!showAmenities)}
          >
            {showAmenities ? '− Ver menos' : '+ Ver mais'}
          </button>
        </div>
      </section>

      <section id="galeria" className="section gallery-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">GALERIA</p>
            <h2>Um pouco do nosso hotel</h2>
            <p>Conheça nossos ambientes e sinta-se bem-vindo.</p>
          </div>
          <div className="gallery-carousel">
            <button
              className="round-button gallery-prev"
              type="button"
              aria-label="Ver fotos anteriores"
              onClick={() => moveGallery(-1)}
            >
              <Icon name="left" />
            </button>
            <div ref={galleryRef} className="gallery-track">
              {gallery.map((photo, index) => (
                <button
                  className="gallery-photo"
                  key={photo.src}
                  type="button"
                  aria-label={`Ampliar: ${photo.alt}`}
                  onClick={() => setPhotoIndex(index)}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" width="600" height="420" />
                  <span className="gallery-expand">
                    <Icon name="expand" size={19} />
                  </span>
                </button>
              ))}
            </div>
            <button
              className="round-button gallery-next"
              type="button"
              aria-label="Ver próximas fotos"
              onClick={() => moveGallery(1)}
            >
              <Icon name="right" />
            </button>
          </div>
        </div>
      </section>

      <section id="turismo" className="tourism-section">
        <div className="container tourism-layout">
          <img
            className="tourism-photo"
            src="/images/lake.jpg"
            alt="Paisagem do Lago das Brisas, na região de Buriti Alegre"
            loading="lazy"
            width="630"
            height="340"
          />
          <div className="tourism-copy">
            <p className="eyebrow">TURISMO LOCAL</p>
            <h2>Conheça Buriti Alegre</h2>
            <p>
              Explore as belezas naturais, o Lago das Brisas e os encantos que tornam nossa cidade
              um destino especial em Goiás.
            </p>
            <ul className="check-list">
              <li>
                <Icon name="check" size={17} />
                Lago das Brisas
              </li>
              <li>
                <Icon name="check" size={17} />
                Pesca e lazer náutico
              </li>
              <li>
                <Icon name="check" size={17} />
                Natureza e tranquilidade
              </li>
            </ul>
          </div>
          <div className="tourism-aside">
            <Icon name="leaf" size={29} />
            <p>
              Desacelere.
              <br />
              <span>Aproveite o caminho.</span>
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lago+das+Brisas+Buriti+Alegre"
              target="_blank"
              rel="noreferrer"
            >
              Explorar a região
              <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </section>
      <section id="localizacao" className="location-section" aria-labelledby="location-heading">
        <div className="container location-layout">
          <div className="location-copy">
            <p className="eyebrow">O CAMINHO PARA UMA BOA ESTADIA</p>
            <h2 id="location-heading">
              Seu próximo descanso <em>é aqui.</em>
            </h2>
            <div className="location-address">
              <Icon name="pin" size={28} />
              <div>
                <h3>{hotel.name}</h3>
                <p>{hotel.address}</p>
                <p>{hotel.city}</p>
              </div>
            </div>
            <p className="location-description">
              Abra o mapa para consultar o trajeto até o hotel. Se precisar de ajuda para chegar,
              nossa equipe está à disposição.
            </p>
            <a
              className="button button-gold"
              href={hotel.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="pin" size={19} />
              Traçar minha rota
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="location-map">
            <iframe
              src={hotel.mapEmbedUrl}
              title="Localização do Flip Palace Hotel em Buriti Alegre, Goiás"
              width="640"
              height="430"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="location-map-caption"
              href={hotel.mapUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir a localização do Flip Palace Hotel no Google Maps"
            >
              <Icon name="pin" size={24} />
              <span>
                <small>Esperamos por você em Buriti Alegre</small>
                <strong>{hotel.name}</strong>
              </span>
              <Icon name="arrow" size={20} />
            </a>
          </div>
        </div>
      </section>
      {photoIndex !== null && (
        <ImageViewer
          photos={gallery}
          index={photoIndex}
          onChange={setPhotoIndex}
          onClose={() => setPhotoIndex(null)}
        />
      )}
    </main>
  )
}
