export interface CategoryConfig {
  slug: string;
  title: string;
  image: string;
  alt: string;
  heroImage: string;
  description: string;
}

export const PRODUCT_CATEGORIES: Record<string, CategoryConfig> = {
  pipesTubes: {
    slug: "pipes-tubes",
    title: "Pipes & Tubes",
    image: "/images/product-home/pipes and tubes.png",
    alt: "Industrial Pipes and Tubes - Shree Raj Steels",
    heroImage: "/images/product-home/pipes and tubes.png",
    description: "Seamless and welded pipes & tubes for high-pressure, high-temperature, and corrosive service across oil & gas, petrochemical, and power-generation industries."
  },
  elbowsBends: {
    slug: "elbows-bends",
    title: "Elbows & Bends",
    image: "/images/product-home/Elbows and bends.png",
    alt: "Industrial Elbows and Bends - Shree Raj Steels",
    heroImage: "/images/product-home/Elbows and bends.png",
    description: "Precision-manufactured 45°, 90°, and 180° elbows and piping bends available in long-radius, short-radius, and custom-radius configurations."
  },
  equalUnequalTees: {
    slug: "tees",
    title: "Equal & Unequal Tees",
    image: "/images/product-home/Equal & Unequal Tees.png",
    alt: "Steel Pipe Tees - Shree Raj Steels",
    heroImage: "/images/product-home/Equal & Unequal Tees.png",
    description: "Seamless and welded equal and reducing tees for branch connections in process piping systems across standard and custom dimensions."
  },
  reducers: {
    slug: "reducers",
    title: "Concentric & Eccentric Reducers",
    image: "/images/product-home/Concentric & Eccentric Reducers.png",
    alt: "Steel Reducers - Shree Raj Steels",
    heroImage: "/images/product-home/Concentric & Eccentric Reducers.png",
    description: "Concentric and eccentric reducers for smooth pipe-size transitions in process, power, and structural piping systems."
  },
  pipeCaps: {
    slug: "pipe-caps",
    title: "Pipe Caps",
    image: "/images/product-home/Pipe Caps.png",
    alt: "Steel Pipe Caps - Shree Raj Steels",
    heroImage: "/images/product-home/Pipe Caps.png",
    description: "Seamless and welded pipe caps for end-closure applications in pressure vessels, piping systems, and structural tubework."
  },
  flanges: {
    slug: "flanges",
    title: "Flanges",
    image: "/images/product-home/Flanges.png",
    alt: "Industrial Flanges - Shree Raj Steels",
    heroImage: "/images/product-home/Flanges.png",
    description: "Forged steel flanges in weld-neck, slip-on, blind, socket-weld, and plate configurations for high pressure ratings and compliant safety standards."
  },
  flatProducts: {
    slug: "flat-products",
    title: "Carbon Steel Flat Products",
    image: "/images/product-home/Carbon Steel Flat Products.png",
    alt: "Steel Flat Products - Shree Raj Steels",
    heroImage: "/images/product-home/Carbon Steel Flat Products.png",
    description: "A comprehensive range of hot-rolled, cold-rolled, galvanised-plain, and colour-coated steel coils and sheets for structural fabrication and manufacturing."
  },
  specialMaterials: {
    slug: "special-materials",
    title: "Special Materials",
    image: "/images/product-home/Special Materials.png",
    alt: "Special Alloy Materials - Shree Raj Steels",
    heroImage: "/images/product-home/Special Materials.png",
    description: "High-performance nickel alloy, super-austenitic, super-duplex, and corrosion-resistant fittings engineered for the most demanding environments."
  }
};
