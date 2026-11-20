import type { IconName } from '../components/Icon'

// Confirme o atendimento por WhatsApp e os dados comerciais antes de publicar.
export const hotel = {
  name: 'Flip Palace Hotel',
  phone: '(64) 3444-1836',
  phoneLink: 'tel:+556434441836',
  whatsapp: '556434441836',
  address: 'Av. Francisco Olímpio de Paiva, 650',
  city: 'Buriti Alegre – GO',
  checkIn: '14h',
  checkOut: '12h',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Flip+Palace+Hotel+Buriti+Alegre+GO',
}

export function whatsappUrl(
  message = 'Olá! Gostaria de consultar uma reserva no Flip Palace Hotel.',
) {
  return `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(message)}`
}

export interface Photo {
  src: string
  alt: string
  illustrative?: boolean
}

export interface Room {
  slug: string
  name: string
  guests: number
  price: number
  size: number
  bed: string
  summary: string
  description: string
  photos: Photo[]
}

const bathroom: Photo = {
  src: '/images/bathroom.jpg',
  alt: 'Referência de banheiro com bancada e chuveiro',
  illustrative: true,
}

// Valores e características de demonstração, baseados na referência enviada.
// Substitua as imagens ilustrativas pelas fotos de cada categoria do hotel.
export const rooms: Room[] = [
  {
    slug: 'individual',
    name: 'Quarto Individual',
    guests: 1,
    price: 150,
    size: 15,
    bed: 'Cama de solteiro',
    summary: 'Ideal para viagens de trabalho ou estadias rápidas.',
    description:
      'Um espaço acolhedor para quem viaja sozinho. O Quarto Individual reúne conforto e praticidade para descansar depois de um dia de trabalho ou de passeios por Buriti Alegre.',
    photos: [
      {
        src: '/images/room-single.jpg',
        alt: 'Referência de quarto individual com cama e roupa de cama branca',
        illustrative: true,
      },
      { src: '/images/hotel-12.jpg', alt: 'Quarto com cama de solteiro no Flip Palace Hotel' },
      bathroom,
    ],
  },
  {
    slug: 'duplo',
    name: 'Quarto Duplo',
    guests: 2,
    price: 180,
    size: 18,
    bed: 'Cama de casal',
    summary: 'Conforto e espaço ideal para duas pessoas.',
    description:
      'O Quarto Duplo oferece um ambiente aconchegante, ideal para casais, amigos ou viagens de trabalho. Conforto, praticidade e toda a estrutura que você precisa para uma excelente estadia.',
    photos: [
      {
        src: '/images/room-double.jpg',
        alt: 'Referência de quarto duplo com cama de casal e iluminação acolhedora',
        illustrative: true,
      },
      { src: '/images/hotel-08.jpg', alt: 'Quarto de casal do Flip Palace Hotel' },
      bathroom,
    ],
  },
  {
    slug: 'triplo',
    name: 'Quarto Triplo',
    guests: 3,
    price: 230,
    size: 24,
    bed: 'Camas para 3 pessoas',
    summary: 'Mais espaço e conforto para sua família.',
    description:
      'Viajar em boa companhia fica ainda melhor com espaço para todos. O Quarto Triplo é uma opção para famílias e pequenos grupos que procuram uma estadia tranquila e confortável.',
    photos: [
      {
        src: '/images/room-triple.jpg',
        alt: 'Referência de acomodação espaçosa para famílias',
        illustrative: true,
      },
      {
        src: '/images/room-double.jpg',
        alt: 'Referência do ambiente e da roupa de cama',
        illustrative: true,
      },
      bathroom,
    ],
  },
]

export const amenities: { icon: IconName; label: string; short: string }[] = [
  { icon: 'bed', label: 'Acomodações confortáveis', short: 'Quartos confortáveis' },
  { icon: 'wifi', label: 'Wi-Fi gratuito', short: 'Wi-Fi gratuito' },
  { icon: 'car', label: 'Estacionamento privativo', short: 'Estacionamento seguro' },
  { icon: 'snow', label: 'Ar-condicionado nos quartos', short: 'Ar-condicionado nos quartos' },
  { icon: 'coffee', label: 'Café da manhã incluso', short: 'Café da manhã' },
  { icon: 'bell', label: 'Atendimento personalizado', short: 'Atendimento personalizado' },
]

export const gallery: Photo[] = [
  { src: '/images/hotel-exterior.jpg', alt: 'Fachada do Flip Palace Hotel em Buriti Alegre' },
  { src: '/images/reception.jpg', alt: 'Recepção e sala de estar do hotel' },
  { src: '/images/restaurant-wide.jpg', alt: 'Salão do restaurante do hotel' },
  {
    src: '/images/breakfast-buffet.jpg',
    alt: 'Inspiração de café da manhã com frutas e pães',
    illustrative: true,
  },
  { src: '/images/hotel-08.jpg', alt: 'Acomodação de casal do hotel' },
  { src: '/images/hotel-14.jpg', alt: 'Estacionamento do hotel' },
]

export function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
