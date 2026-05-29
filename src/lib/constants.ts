// Company Information
export const COMPANY = {
  name: 'Shree Raj Steels',
  shortName: 'SRS',
  tagline: 'Engineering Excellence in Every Fitting',
  philosophy: 'Doing a good job of every piece of pipe & fittings',
  vision: 'Being the best pipe, fittings and flanges supplier in the world',
  founded: 'August 2019',
  experience: '40+',
  website: 'https://www.shreerajsteels.com',
  email: 'srsteelbby@gmail.com',
  phones: ['+91 7069672923', '+91 7400410762'],
  whatsapp: '917069672923',
  businessType: 'Manufacturer, Supplier, Importer, Exporter',
} as const;

export const LOCATIONS = {
  headOffice: {
    label: 'Head Office',
    address: '408, Kamdhenu Commerz, Sector 14, Kharghar',
    city: 'Navi Mumbai',
    pincode: '410210',
    state: 'Maharashtra',
    country: 'India',
    full: '408, Kamdhenu Commerz, Sector 14, Kharghar, Navi Mumbai – 410210, Maharashtra, India',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.07!3d19.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzI0LjAiTiA3M8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1',
  },
  factory: {
    label: 'Factory / Warehouse',
    address: 'Plot 1680, 1681, 1710 & 1711, Road L-20, Kalamboli Steel Market',
    city: 'Kalamboli, Raigad',
    pincode: '410218',
    state: 'Maharashtra',
    country: 'India',
    full: 'Plot 1680, 1681, 1710 & 1711, Road L-20, Kalamboli Steel Market, Kalamboli, Raigad – 410218, Maharashtra, India',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.1!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzI0LjAiTiA3M8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1',
  },
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/shree-raj-steels',
  instagram: 'https://www.instagram.com/shreerajsteels',
  facebook: 'https://www.facebook.com/shreerajsteels',
  youtube: 'https://www.youtube.com/@shreerajsteels',
} as const;

export const NAV_LINKS = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Pipes & Tubes', href: '/products/pipes-tubes', image: '/images/products/pipes.jpg' },
      { label: 'Elbows & Bends', href: '/products/elbows-bends', image: '/images/products/elbows.jpg' },
      { label: 'Equal & Unequal Tees', href: '/products/tees', image: '/images/products/tees.jpg' },
      { label: 'Reducers', href: '/products/reducers', image: '/images/products/reducers.jpg' },
      { label: 'Pipe Caps', href: '/products/pipe-caps', image: '/images/products/caps.jpg' },
      { label: 'Flanges', href: '/products/flanges', image: '/images/products/flanges.jpg' },
      { label: 'Flat Products', href: '/products/flat-products', image: '/images/products/flat.jpg' },
      { label: 'Special Materials', href: '/products/special-materials', image: '/images/products/special.jpg' },
    ],
    materials: [
      { label: 'Carbon Steel', href: '/products?grade=carbon-steel' },
      { label: 'Alloy Steel', href: '/products?grade=alloy-steel' },
      { label: 'Stainless Steel', href: '/products?grade=stainless-steel' },
      { label: 'Duplex & Super Duplex', href: '/products?grade=duplex' },
      { label: 'Exotic & Nickel Alloys', href: '/products?grade=exotic' },
    ],
    resources: [
      { label: 'Request a Quote', href: '/quote' },
      { label: 'Technical Charts', href: '/technical-data' },
      { label: 'Quality Control', href: '/about#qc-lab' },
      { label: 'Our Certifications', href: '/about#certifications' },
    ],
  },
  {
    label: 'Industries',
    href: '/#industries',
    children: [
      { label: 'Chemical Engineering', href: '/#industries' },
      { label: 'Nuclear Energy', href: '/#industries' },
      { label: 'Petroleum', href: '/#industries' },
      { label: 'Natural Gas', href: '/#industries' },
      { label: 'Shipbuilding', href: '/#industries' },
      { label: 'Food Industry', href: '/#industries' },
      { label: 'Water Disposal', href: '/#industries' },
      { label: 'Fertilisers & Nitric Acid', href: '/#industries' },
    ],
  },
  {
    label: 'Technical Data',
    href: '/technical-data',
    children: [
      { label: 'Pipe Dimensions', href: '/technical-data?tab=pipes' },
      { label: 'Flange Dimensions', href: '/technical-data?tab=flanges' },
      { label: 'Butt-Weld Fittings', href: '/technical-data?tab=fittings' },
      { label: 'PDF Catalogue', href: '/downloads/SRS-Catalogue.pdf', external: true },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about' },
      { label: 'Quality & QC Lab', href: '/about#qc-lab' },
      { label: 'Production Equipment', href: '/about#equipment' },
      { label: 'Manufacturing Process', href: '/process' },
      { label: 'Product Gallery', href: '/gallery' },
      { label: 'Certifications', href: '/about#certifications' },
      { label: 'Blog / Insights', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
] as const;

export const STATS = [
  { value: 40, suffix: '+', label: 'Years Experience' },
  { value: 1500, suffix: '+', label: 'Tons Inventory' },
  { value: 285, suffix: '+', label: 'Material Grades' },
  { value: 7, suffix: '+', label: 'Certifications' },
] as const;

export const CERTIFICATIONS = [
  {
    name: 'ISO 9001:2015',
    fullName: 'Quality Management System',
    certNo: '709924',
    issued: '21 March 2025',
    validTill: '21 March 2028',
    issuedBy: 'Guardian Independent Certification Ltd',
    accreditation: 'IAF accredited',
  },
  {
    name: 'ISO 14001:2015',
    fullName: 'Environmental Management System',
    certNo: '26DEPM64',
    issued: '13/04/2026',
    validTill: '12/04/2029',
    issuedBy: 'ROTES Certification Pvt. Ltd.',
  },
  {
    name: 'ISO 45001:2018',
    fullName: 'Occupational Health & Safety Management System',
    certNo: '26DOPW63',
    issued: '13/04/2026',
    validTill: '12/04/2029',
    issuedBy: 'ROTES Certification Pvt. Ltd.',
  },
  {
    name: 'CE-PED',
    fullName: 'EU Pressure Equipment Directive 2014/68/EU',
    certNo: '18580/5/2025-CERT-01',
    issued: '2025',
    validTill: 'November 5, 2028',
    issuedBy: 'Technická inšpekcia, a.s., Bratislava',
  },
  {
    name: 'AD2000',
    fullName: 'German Pressure Vessel Technical Specification',
    certNo: '',
    issued: '',
    validTill: '',
    issuedBy: '',
  },
] as const;

export const INSPECTION_BODIES = [
  'Bureau Veritas',
  'TÜV Rheinland',
  'TÜV Nord',
  'DNV',
  'SGS',
  'Intertek',
  'CEIL',
  'Toyo Engineering',
  'PED Certified',
] as const;

export const KEY_CLIENTS = [
  'BHEL',
  'ONGC',
  'Techniche',
  'Toyo Engineering',
  'Reliance Industries',
] as const;

export const INDUSTRIES = [
  {
    name: 'Chemical Engineering',
    description: 'Process piping, reactors, heat exchangers',
    icon: 'Flask',
  },
  {
    name: 'Nuclear Energy',
    description: 'Reactor-grade fittings & certified materials',
    icon: 'Atom',
  },
  {
    name: 'Petroleum',
    description: 'Upstream, midstream & downstream piping',
    icon: 'Fuel',
  },
  {
    name: 'Natural Gas',
    description: 'LNG-grade pipes, cryogenic service fittings',
    icon: 'Flame',
  },
  {
    name: 'Shipbuilding',
    description: 'Marine-grade alloy & duplex solutions',
    icon: 'Ship',
  },
  {
    name: 'Food Industry',
    description: 'Hygienic stainless steel piping systems',
    icon: 'UtensilsCrossed',
  },
  {
    name: 'Water Disposal',
    description: 'Corrosion-resistant treatment plant piping',
    icon: 'Droplets',
  },
  {
    name: 'Fertilisers & Nitric Acid',
    description: 'Acid-resistant special alloy fittings',
    icon: 'Beaker',
  },
] as const;

export const BUSINESS_HOURS = 'Monday – Saturday, 9:00 AM – 7:00 PM IST';
