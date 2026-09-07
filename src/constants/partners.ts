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
    // A full Google Maps embed URL (the pb=... form from Google's own "Embed a map"
    // share option), used as-is when present. Falls back to a plain query-based
    // embed built from `address` when this isn't set.
    mapEmbedUrl?: string;
    // Short annotation shown near the address/map — for caveats like "online-first business".
    note?: string;
}

export const partners: PartnerBrand[] = [
    {
        slug: "flight-foods",
        name: "Flight Foods",
        logo: "/assets/images/flight-foods.jpg",
        categories: ["Supplements", "Faith-based"],
        summary: "A Catholic supplement company built around clean ingredients, disciplined living, and fueling the body with intention. Flight Foods pairs performance nutrition with a stated commitment to faith, family, and integrity.",
        website: "https://flight-foods.com/",
        address: "2013 N Howard Ave, Tampa, FL 33607",
        phone: "(813) 356-9398",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.113812370948!2d-82.48528812386265!3d27.959800476038748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b7cb8308dd3f%3A0xd2e862bb51f3662b!2sFlight%20Foods!5e0!3m2!1sen!2sus!4v1788809318020!5m2!1sen!2sus",
        note: "Flight Foods operates online-first — this is their listed business address, not a storefront.",
        // hours / gbpUrl: not yet confirmed
    },
    {
        slug: "genesis-chiropractic",
        name: "Genesis Chiropractic",
        logo: "/assets/images/genesis-chiropractic.jpg",
        heroImage: "/assets/images/IMG_1889.JPG",
        categories: ["Gonstead Chiropractic", "Physical health"],
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
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44004.20597636062!2d-129.9777275208984!3d46.42366899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x69b4fabe94eaebb3%3A0x86d2ccd5188eec62!2sHappy%20Dude%20Supplement%20Co.!5e0!3m2!1sen!2sus!4v1788809286819!5m2!1sen!2sus",
        // address / phone / hours / gbpUrl: not yet confirmed
    },
];
