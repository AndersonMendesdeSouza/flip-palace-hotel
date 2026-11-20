import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { hotel, whatsappUrl } from '../data/hotel'

const navigation = [
  { id: 'inicio', label: 'Início' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'comodidades', label: 'Comodidades' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'turismo', label: 'Turismo' },
  { id: 'contato', label: 'Contato' },
]

export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Flip Palace Hotel — página inicial">
      <svg viewBox="0 0 100 75" aria-hidden="true" className="brand-mark">
        <path
          fill="currentColor"
          d="M7 64C23 66 24 52 32 37 41 21 52 17 65 18L57 7l18 7c6-1 11 0 15 5l8 9-17-1c-17 2-33 6-44 22L24 69c-8 1-16 0-22-3l5-2ZM47 29l-6-13 17 5M60 35l11 9-4-14"
        />
        <circle cx="84" cy="21" r="1.4" fill="#09151e" />
        <path d="M4 71c17 4 30-5 44-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
      <span>
        FLIP PALACE<small>HOTEL</small>
      </span>
    </Link>
  )
}

export function WhatsAppButton({
  message,
  children = 'Reservar pelo WhatsApp',
  className = '',
}: {
  message?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <a
      className={`button button-gold ${className}`}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="whatsapp" size={21} />
      <span>{children}</span>
      <Icon name="arrow" size={18} />
    </a>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav
          id="main-navigation"
          className={`main-navigation ${menuOpen ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.id}
              to="/"
              state={{ section: item.id }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            className="button button-gold header-reserve"
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
          >
            Reservar
            <Icon name="whatsapp" size={19} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer id="contato" className="site-footer">
      <div className="reservation-strip">
        <div className="container reservation-inner">
          <div>
            <h2>Faça sua reserva</h2>
            <p>Seu próximo descanso começa aqui.</p>
          </div>
          <a className="phone-link" href={hotel.phoneLink}>
            <Icon name="phone" />
            <span>
              <strong>{hotel.phone}</strong>
              <small>Fale com a nossa equipe</small>
            </span>
          </a>
          <WhatsAppButton />
        </div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo />
          <p>
            Acolhimento e conforto
            <br />
            em Buriti Alegre, Goiás.
          </p>
        </div>
        <div className="footer-links">
          <h3>Explore o hotel</h3>
          {navigation.slice(0, 4).map((item) => (
            <Link key={item.id} to="/" state={{ section: item.id }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <h3>Planeje sua visita</h3>
          {navigation.slice(4).map((item) => (
            <Link key={item.id} to="/" state={{ section: item.id }}>
              {item.label}
            </Link>
          ))}
          <a href={hotel.mapUrl} target="_blank" rel="noreferrer">
            Como chegar
          </a>
        </div>
        <div className="footer-address">
          <h3>Esperamos por você</h3>
          <a href={hotel.mapUrl} target="_blank" rel="noreferrer">
            <Icon name="pin" size={22} />
            <span>
              {hotel.address}
              <br />
              {hotel.city}
            </span>
          </a>
          <a className="footer-map-link" href={hotel.mapUrl} target="_blank" rel="noreferrer">
            Ver no Google Maps <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Flip Palace Hotel. Todos os direitos reservados.</span>
        <span>Feito para receber bem.</span>
      </div>
      <div className="mobile-reserve">
        <WhatsAppButton />
      </div>
    </footer>
  )
}
