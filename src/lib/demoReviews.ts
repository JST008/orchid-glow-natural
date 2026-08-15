export interface DemoReview {
  name: string;
  location: string;
  rating: number;
  date: string;
  variant: string;
  title: string;
  body: string;
}

const GENERIC: DemoReview[] = [
  {
    name: "Maricel A.",
    location: "Quezon City, Metro Manila",
    rating: 5,
    date: "July 28, 2026",
    variant: "2 Bars",
    title: "Sulit sa presyo",
    body:
      "Nag-order ako ng 2 bars, dumating after 3 days sa QC. COD pa kaya walang hassle. Mabango at hindi nakaka-tigang sa balat. Halata na mas smooth ang skin ko after 2 weeks.",
  },
  {
    name: "Jhon Rey P.",
    location: "Cebu City",
    rating: 5,
    date: "July 19, 2026",
    variant: "1 Bar",
    title: "Legit seller, sealed pagdating",
    body:
      "Provincial delivery, 5 days lang. Sealed at may bubble wrap. Ginagamit ko every gabi, hindi masakit sa balat kahit sensitive ako. Uulit ako ng 4 bars next time.",
  },
  {
    name: "Aileen G.",
    location: "Davao City",
    rating: 4,
    date: "July 6, 2026",
    variant: "3 Bars",
    title: "Nakita ko ang difference",
    body:
      "Konting adjustment lang sa first week kasi twice a day agad ako gumamit, so binawasan ko sa once daily. Ngayon okay na, less dark spots sa braso ko. 4 stars kasi maliit ang bar, mabilis maubos.",
  },
];

const BY_HANDLE: Record<string, DemoReview[]> = {
  "orchid-glow-aaa-collagen-soap-with-oatmeal-70g": [
    {
      name: "Kristine M.",
      location: "Pasig City",
      rating: 5,
      date: "August 2, 2026",
      variant: "2 Bars",
      title: "Ang oatmeal talaga ang bet ko",
      body:
        "Dull at tuyo dati ang skin ko lalo sa braso. After 3 weeks ng collagen soap, mas fresh at moisturized na. Hindi matapang ang amoy, parang milky-oat. Arrived in Pasig after 2 days.",
    },
    ...GENERIC.slice(1),
  ],
  "orchid-glow-aaa-whitening-soap-70g": [
    {
      name: "Rowena D.",
      location: "Antipolo, Rizal",
      rating: 5,
      date: "July 31, 2026",
      variant: "4 Bars",
      title: "Even tone na ang kili-kili at leeg",
      body:
        "Ginagamit ko sa underarms at leeg, isang buwan na. Hindi nagkaroon ng irritation kasi sinunod ko ang once daily muna. Nag-order ako ng 4 bars para sulit, tama lang ang bundle price.",
    },
    ...GENERIC.slice(1),
  ],
  "orchid-glow-aaa-himalayan-skin-rescue-soap-70g": [
    {
      name: "Paolo S.",
      location: "Bacolod City",
      rating: 5,
      date: "July 24, 2026",
      variant: "2 Bars",
      title: "Pang-bungad sa pawis at bakne",
      body:
        "Nagbabike ako araw-araw kaya madaming bakne sa likod. Two weeks ng Himalayan soap, halos wala nang bago. Refreshing sa gamit lalo sa tanghali.",
    },
    ...GENERIC.slice(1),
  ],
  "orchid-glow-aaa-niacinamide-collagen-glasskin-soap-70g": [
    {
      name: "Angel V.",
      location: "Makati City",
      rating: 5,
      date: "August 5, 2026",
      variant: "3 Bars",
      title: "Glass skin feels, totoo",
      body:
        "Yung glow talaga ang naging pinaka-obvious. Malinis pero hindi tight ang feeling after rinse. Sinusunod ko sunscreen sa umaga per instructions. Delivered Makati next day.",
    },
    ...GENERIC.slice(1),
  ],
  "orchid-glow-aaa-niacinamide-lotion-spf-50-pa-250ml": [
    {
      name: "Jasmine L.",
      location: "Cavite",
      rating: 5,
      date: "July 29, 2026",
      variant: "250mL",
      title: "Lotion + SPF, praktikal sa PH init",
      body:
        "Two-in-one na kaya mabilis mag-prep bago pumasok. Hindi sticky kahit ang lakas ng araw sa Cavite. 250mL kaya matagal bago maubos, worth ang ₱329.",
    },
    {
      name: "Dennis R.",
      location: "Iloilo City",
      rating: 4,
      date: "July 12, 2026",
      variant: "250mL",
      title: "Mabilis mag-absorb",
      body:
        "Maganda ang pump, walang tapon. Konting white cast lang sa umpisa pero nawawala after a minute. Solid para sa daily use.",
    },
    ...GENERIC.slice(2),
  ],
  "orchid-glow-aaa-sunscreen-spf-50-50ml": [
    {
      name: "Camille B.",
      location: "Taguig City",
      rating: 5,
      date: "August 8, 2026",
      variant: "50mL",
      title: "Hindi mabigat sa mukha",
      body:
        "Nakakapag-makeup pa rin ako on top, hindi nag-pilling. Wala ring sting sa eyes. Dinala ko sa beach trip sa La Union, walang sunburn.",
    },
    {
      name: "Michael T.",
      location: "Baguio City",
      rating: 5,
      date: "July 21, 2026",
      variant: "50mL",
      title: "Everyday sunscreen na inaabangan",
      body:
        "Matte finish, hindi oily kahit sa tanghali. Compact ang 50mL kaya kasya sa bag. Fast shipping papuntang Baguio, 4 days.",
    },
    ...GENERIC.slice(0, 1),
  ],
};

export function getDemoReviews(handle: string): DemoReview[] {
  return BY_HANDLE[handle] ?? GENERIC;
}
