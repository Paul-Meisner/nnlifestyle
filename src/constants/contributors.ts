export interface Contributor {
    slug: string;
    name: string;
    tier: "permanent" | "guest";
    role: string;
    photo: string;
    blurb: string;
    specialties?: string[];
    // Slug into partners.ts, when this contributor is affiliated with a featured brand.
    affiliatedPartnerSlug?: string;
    // Exact prescribed disclosure sentence — not generated, to keep pronouns/wording precise.
    disclosureText?: string;
    professionalLinksNote?: string;
    professionalUrl?: string;
    sameAs?: string[];
}

// Short index-page entries. Full profiles live at /author/{slug}/.
export const contributors: Contributor[] = [
    {
        slug: "paul-meisner",
        tier: "permanent",
        name: "Paul Meisner",
        role: "Founder and Editor",
        photo: "/assets/images/Paul.JPG",
        // Kept identical to the bio on /about/ on purpose — two slightly different
        // bios for the same person undercuts entity consolidation.
        blurb: "Paul Meisner is the founder and editor of Now or Never. He writes about training, nutrition, faith, and the long game of staying healthy while running a business and raising a family. He is not a physician, and Now or Never does not publish medical advice — what it publishes is the reasoning, the research, and the lived experience behind decisions readers are making anyway.",
        professionalLinksNote: "Full bio in progress. Links: LinkedIn · X · Instagram · Email — to be added.",
        sameAs: [],
    },
    {
        slug: "maycee-sturino",
        tier: "guest",
        name: "Dr. Maycee Sturino, D.C.",
        role: "Co-Owner & Chiropractor · Genesis Chiropractic",
        photo: "",
        blurb: "Dr. Maycee Sturino is a Gonstead-certified chiropractor and co-owner of Genesis Chiropractic in Appleton, Wisconsin, alongside her husband, Dr. Alex Sturino. Inspired to enter the field after recovering from a career-threatening powerlifting injury, she specializes in family wellness, prenatal care, and pediatric development, holding Webster Certification through the ICPA. Dr. Sturino is a passionate advocate for natural health, recently featured on the Motherhood Alliance podcast discussing how specialized chiropractic care impacts pregnancy, birth, and child development.",
        specialties: ["Maternal health, prenatal and pediatric care, Gonstead chiropractic methodology, and family wellness"],
        affiliatedPartnerSlug: "genesis-chiropractic",
        disclosureText: "Genesis Chiropractic is a featured partner on this site. Dr. Sturino was not paid for her appearance and did not pay to appear here.",
        professionalUrl: "https://www.genesischirowi.com/",
        sameAs: [],
    },
    {
        slug: "thomas-lahart",
        tier: "guest",
        name: "Thomas Lahart",
        role: "Founder · Flight Foods",
        photo: "",
        blurb: "Thomas Lahart is the founder of Flight Foods, a Tampa-based Catholic nutritional supplement brand uniting faith, fitness, and clean nutrition. Starting the company from his Auburn University dorm in 2020, Thomas bootstrapped his vision into a nationwide e-commerce success. An athlete and entrepreneur, he saw a gap in the market for transparent, high-performance supplements without proprietary blends or artificial fillers. Driven by a mission to help people become \"Fit for the Kingdom\" and honor their bodies as temples, Thomas provides a unique perspective on integrating spiritual well-being with physical performance and building community-focused, mission-driven brands.",
        specialties: ["Mission-driven entrepreneurship, sports nutrition, clean supplementation, and the intersection of faith and fitness"],
        affiliatedPartnerSlug: "flight-foods",
        disclosureText: "Flight Foods is a featured partner on this site. Thomas was not paid for his article and did not pay to appear here.",
        professionalUrl: "https://flight-foods.com/",
        sameAs: [],
    },
];
