export type PricingTier = {
  label: string
  amountIls: number
  note: string
}

export type Office = {
  id: string
  number: 1 | 2 | 3
  name: string
  subtitle: string
  address: string
  floor: string
  sqm: number
  sqft: number
  term: string
  pricing: PricingTier[]
  perks: string[]
  photos: string[]
  videos: { src: string; poster?: string; label: string }[]
  floorplan?: string
  ready: boolean
}

export const offices: Office[] = [
  {
    id: 'sky-tower-fl2',
    number: 1,
    name: 'Sky Tower',
    subtitle: '2nd Floor',
    address: 'Yitzhak Sadeh St 8, Tel Aviv',
    floor: '2',
    sqm: 277,
    sqft: 3000,
    term: '1 year + option for a 2nd year',
    pricing: [
      {
        label: 'Traditional',
        amountIls: 44320,
        note: '₪160/sqm base + bills (management, arnona, utilities separate)',
      },
      {
        label: 'All-Inclusive',
        amountIls: 72000,
        note: 'Flat monthly — management, arnona, utilities, internet, daily cleaning, stocked kitchen/coffee, on-site support',
      },
    ],
    perks: [
      'Rooftop access',
      'Shared lounge',
      '10 hrs/mo shared conference room credits',
    ],
    photos: [
      '/media/sky-tower/01-photo.jpg',
      '/media/sky-tower/02-photo.jpg',
      '/media/sky-tower/03-photo.jpg',
      '/media/sky-tower/04-photo.jpg',
      '/media/sky-tower/05-photo.jpg',
      '/media/sky-tower/06-photo.jpg',
      '/media/sky-tower/07-photo.jpg',
    ],
    videos: [
      {
        src: '/media/sky-tower/01-tour.mp4',
        poster: '/media/sky-tower/01-tour.jpg',
        label: '',
      },
      {
        src: '/media/sky-tower/02-tour.mp4',
        poster: '/media/sky-tower/02-tour.jpg',
        label: 'Shared Space with Other Offices',
      },
    ],
    floorplan: '/media/sky-tower/00-floorplan.jpg',
    ready: true,
  },
  {
    id: 'sky-tower-unit-b',
    number: 2,
    name: 'Sky Tower',
    subtitle: '22nd Floor',
    address: 'Yitzhak Sadeh St 8, Tel Aviv',
    floor: '22',
    sqm: 287,
    sqft: 3100,
    term: '2 years minimum',
    pricing: [
      {
        label: 'Base rent',
        amountIls: 50225,
        note: '₪175/sqm · ₪50,225/mo before bills',
      },
      {
        label: 'Est. all-in',
        amountIls: 66500,
        note: 'Base + bills ~₪16k–17k → about ₪66k–67k/mo total',
      },
    ],
    perks: [
      'High-floor city views',
      'Furnished open workspace + conference rooms',
      'Move-in ready layout (see floor plan)',
    ],
    photos: [
      '/media/sky-tower-unit-b/01-photo.jpg',
      '/media/sky-tower-unit-b/03-photo.jpg',
      '/media/sky-tower-unit-b/04-photo.jpg',
      '/media/sky-tower-unit-b/05-photo.jpg',
      '/media/sky-tower-unit-b/06-photo.jpg',
      '/media/sky-tower-unit-b/07-photo.jpg',
    ],
    videos: [
      {
        src: '/media/sky-tower-unit-b/01-tour.mp4',
        poster: '/media/sky-tower-unit-b/01-tour.jpg',
        label: '',
      },
    ],
    floorplan: '/media/sky-tower-unit-b/00-floorplan.jpg',
    ready: true,
  },
  {
    id: 'midtown-fl36',
    number: 3,
    name: 'Midtown Tower',
    subtitle: '36th Floor',
    address: 'Derech Menachem Begin, Tel Aviv',
    floor: '36',
    sqm: 250,
    sqft: 2700,
    term: '2 years + option',
    pricing: [
      {
        label: 'Base rent',
        amountIls: 45000,
        note: '₪180/sqm · ₪45,000/mo before bills',
      },
      {
        label: 'Est. all-in',
        amountIls: 61750,
        note: 'Total after bills estimated ~₪61,750/mo',
      },
    ],
    perks: [
      '36th-floor views',
      'Premier tech building',
      'Right off the light rail / highway',
    ],
    photos: [
      '/media/midtown-fl36/01-photo.jpg',
      '/media/midtown-fl36/03-photo.jpg',
      '/media/midtown-fl36/04-photo.jpg',
      '/media/midtown-fl36/05-photo.jpg',
      '/media/midtown-fl36/06-photo.jpg',
      '/media/midtown-fl36/07-photo.jpg',
      '/media/midtown-fl36/08-photo.jpg',
    ],
    videos: [
      {
        src: '/media/midtown-fl36/01-tour.mp4',
        poster: '/media/midtown-fl36/01-tour.jpg',
        label: '',
      },
    ],
    floorplan: '/media/midtown-fl36/00-floorplan.jpg',
    ready: true,
  },
]
