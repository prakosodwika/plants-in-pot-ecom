export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Monstera Adansonii",
    price: 45.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0hkG6p94-0BdkHQjrX61DiCq_hGlClgotOjbLnmj3caqLH4-MbL5qEvky3pRjFo0_ppA4Qp7lTUxZ8rty3PUjBf1BAXlM0EX4U3dH1ENKIskDFNFl8WJU2wNWMFNBq6hRCt2uPxRoy1ywe-n6EUJQIH1TB33gVoAN9TP4OoG8suWMk0K0qtABVzbdzupaYfqvHWipUZ6nfIj4EIn6Xz0wSdT4EOvkrZUOPu_87yQIigABp8j76LRftSeKYaq3kA5QhfZm9SmeiBU",
    category: "Indoor Plants",
    description: "The Adansonii is a unique, trailing Monstera with beautiful, oval-shaped leaves.",
    isNew: true,
  },
  {
    id: "2",
    name: "Olive Tree",
    price: 120.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD24V8uzMDhmuxYd8tdroytmSGt9xWkDT9vo0GFCDbPGZG9NUGBQaxYwiIPvUawqxRvWVirEkyIRQv70D48Xh9C-QMDJTLFz0tngF1Tcq1x6vw9wO3Tp9WtlMqnGs3wLmm4WXPbklHUWJ3o4RF7LOM2DHrdccg8FZCmV09jmRMIYjBWLiQlZBi1OKALRTAoDK5UXku7sXwiQe8G0bFYyx4_vEb1JV45-DpoHPUIAao19iNszqLeLxcg1b6fz9O8oStm_f25HtlqRFg",
    category: "Indoor Trees",
    description: "The Olive Tree is an elegant, architectural piece that adds a Mediterranean feel to any space.",
    isNew: true,
  },
  {
    id: "3",
    name: "Bird of Paradise",
    price: 85.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRDOL0sb2T_g6rf264GQogQWWDOPhzozv_gi5zuWYTPIuAnouhJngZkzy8fpzgsce-z3MkxIeCScQMeqh9cjUFc3wBrq3xDdL9uPjVQFnnIlIkD--dy2ML42TruDhDCA0OePte5r6g6gvnuZ9FWAp4-IZGrpn-55YaaFoflujNVK9E0tfHjq1fCDLP88TyIP1dTcmE21mmcvK05wl1qdmqHor4bFhLKbnHXx3Jh_6RdoiNsnmNg6ADHHjvqMqSa_w3aiIZ7BvHs2g",
    category: "Indoor Plants",
    description: "The Bird of Paradise is a dramatic, large-leafed plant that brings a tropical vibe.",
    isNew: true,
  },
  {
    id: "4",
    name: "Alocasia Polly",
    price: 38.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfyvMXO3nha3db4v-0faNqkax_lBicvTLbpD1nY7UoBy88QhFsxRevKMaX2TH5TRNGow-jW7FS-WX1igFoRQAB-Rqfwavx0RmpZ-395DQZihCYc-M3PPXKrvN9Pq2XY1lYg35ekTtXQrAtmQhvcJdoaYcCfYRBwZgkloSIPrmBp2m25ulGXSAKk_Ab1poNn5ZbNQ_zxHQfja-dKwoV2PxZOEC2EsuNGprEGq19CpafHKtFfQorYKFWnFV0cIqhHL-CY5to2bL1JOQ",
    category: "Indoor Plants",
    description: "The Alocasia Polly has striking, arrow-shaped leaves with silver veins.",
    isNew: true,
  },
  {
    id: "5",
    name: "Fiddle Leaf Fig",
    price: 150.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvThJENSVIRjgc9Cq5tn0vY5eW_k-vX51upwPpN2Z2PeKiPZgKdrin8ug_8m9RKuGhTqwXfzFCS9S-HAX-a5BbX5vV0leqIo5cefA0pnaKFpoDLOutNKWJRnUn_Kyd5PVr4D1WzkU-eGy7r5jJDru15nldq1u5DbZf15t9L8vOa3nuv0ntfQr7sm1bOTS4leIXovwvL3v98Chm2Ovr85u_MbL30hQNrg-7m5qotQAh1EPePIT4UgG9HrvEsWReswOMlSINaEhLkr4",
    category: "Indoor Trees",
    description: "The Fiddle Leaf Fig is the ultimate statement piece for any bright room.",
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Snake Plant Laurentii",
    price: 55.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi2A0uxVGdmEayjg5q3OK9BQih9HopqhNOrcOzV9DyLdZXC8qLiZnqY1gVgy-aX3yLn7fvUyn8JTwpVi4APMBtIq33AaLD4pzKArzHmiPJCSakChoCKcU6E_1H5Yn7vLZhgvMuw9iT8gLlsIagyqjjPfS75K2QtrXYPtgW4WL6Xq9vdWLdKogVZeLPfiej4PTyGMoppmFaFI1Tt2Y4DEvhMKgCKlU9khPZQ7wKYdUp5GfKNfyaLobeoKIVPsBL1LpCgHS6lDiQNdI",
    category: "Indoor Plants",
    description: "Unstoppable and incredibly easy to care for, the Snake Plant is perfect for beginners.",
    isBestSeller: true,
  },
];

export enum CheckoutStep {
  ReviewItems = "Review Items",
  ShippingAddress = "Shipping Address",
  ChooseCourier = "Choose Courier",
  FinalReview = "Final Review",
}

export const steps = Object.values(CheckoutStep);

export enum CourierType {
  Standard = "standard",
  Express = "express",
  Premium = "premium",
}

export interface Courier {
  id: CourierType;
  name: string;
  price: number;
  deliveryTime: string;
}

export const couriers: Courier[] = [
  {
    id: CourierType.Standard,
    name: "Standard Delivery",
    price: 15.0,
    deliveryTime: "3-5 business days",
  },
  {
    id: CourierType.Express,
    name: "Express Shipping",
    price: 35.0,
    deliveryTime: "1-2 business days",
  },
  {
    id: CourierType.Premium,
    name: "White Glove Delivery",
    price: 75.0,
    deliveryTime: "Scheduled Delivery",
  },
]
