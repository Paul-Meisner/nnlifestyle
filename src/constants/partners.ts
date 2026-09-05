export interface PartnerBrand {
    slug: string;
    name: string;
    logo: string;
    // Real photo once available; the UI falls back to a placeholder panel without it.
    heroImage?: string;
    categories: string[];
    summary: string;
    website: string;
    address?: string;
    phone?: string;
    hours?: string;
    // Google Business Profile link
    gbpUrl?: string;
}

export const partners: PartnerBrand[] = [
    {
        slug: "flight-foods",
        name: "Flight Foods",
        logo: "/assets/images/flight-foods.jpg",
        categories: ["Supplements", "Faith-based"],
        summary: "A Catholic supplement company built around clean ingredients, disciplined living, and fueling the body with intention. Flight Foods pairs performance nutrition with a stated commitment to faith, family, and integrity.",
        website: "https://flight-foods.com/",
        // address / phone / hours / gbpUrl: not yet confirmed
    },
    {
        slug: "genesis-chiropractic",
        name: "Genesis Chiropractic",
        logo: "/assets/images/genesis-chiropractic.jpg",
        categories: ["Chiropractic", "Physical health"],
        summary: "A chiropractic practice specializing in the Gonstead Method, a precise, results-driven approach to spinal health. Genesis focuses on correcting the root cause of pain and dysfunction rather than masking symptoms.",
        website: "https://genesischirowi.com/",
        address: "2121 S Schaefer St, Appleton, WI 54915",
        phone: "(920) 732-2285",
        // hours / gbpUrl: not yet confirmed
    },
    {
        slug: "happy-dude",
        name: "Happy Dude Supplements",
        logo: "/assets/images/happy-dude.png",
        categories: ["Supplements", "Mental health"],
        summary: "A supplement company centered on mental health, emotional resilience, and supporting the whole person. Happy Dude formulates for balance, clarity, and long-term well-being.",
        website: "https://happydudesupps.com/",
        // address / phone / hours / gbpUrl: not yet confirmed
    },
];
