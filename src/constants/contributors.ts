export interface Contributor {
    slug: string;
    name: string;
    tier: "permanent" | "guest";
    role: string;
    photo: string;
    blurb: string;
    // Shorter version of `blurb` for the /contributors/ index card. Falls back to
    // `blurb` when unset. The full bio still shows on the contributor's own /author/ page.
    shortBio?: string;
    specialties?: string[];
    // Slug into partners.ts, when this contributor is affiliated with a featured brand.
    affiliatedPartnerSlug?: string;
    // Exact prescribed disclosure sentence — not generated, to keep pronouns/wording precise.
    disclosureText?: string;
    professionalLinksNote?: string;
    professionalUrl?: string;
    sameAs?: string[];
}

// "Paul" from "Paul Meisner", but "Dr. Sturino" from "Dr. Maycee Sturino, D.C." —
// dropping a doctor's first name and any trailing credential reads better than a
// bare first name or "Dr." on its own (which is all name.split(" ")[0] gives you).
export function contributorShortName(name: string): string {
    const isDoctor = /^Dr\.\s/.test(name);
    const withoutCredential = name.replace(/,\s*[A-Z.]+$/, "");
    const parts = withoutCredential.split(" ").filter(Boolean);
    return isDoctor ? `Dr. ${parts[parts.length - 1]}` : parts[0];
}

// Short index-page entries. Full profiles live at /author/{slug}/.
export const contributors: Contributor[] = [
    {
        slug: "paul-meisner",
        tier: "permanent",
        name: "Paul Meisner",
        role: "Founder and Editor",
        photo: "/assets/images/Paul.JPG",
        // Kept identical to the bio on /about/ and the author archive on purpose —
        // two slightly different bios for the same person undercuts entity consolidation.
        blurb: "Paul Meisner is the founder and editor of Now or Never. He was born and raised in Germany and came to the United States for college, where he studied software engineering and information systems. He works in SEO and operations, keeps a few head of cattle on the side, and gardens badly but persistently. He came to the Catholic faith in 2022 after growing up without one — a decision that shapes how he writes about discipline, stewardship, and the long game. He lives in Freedom, Wisconsin with his wife and children. He is not a physician, and this site does not publish medical advice.",
        // Shorter version for article footers.
        shortBio: "Paul Meisner is the founder and editor of Now or Never. Born and raised in Germany, now in Freedom, Wisconsin with his wife and kids. Works in SEO, keeps cattle part-time, came to the Catholic faith in 2022. Not a physician — what he publishes is the reasoning behind decisions readers are making anyway.",
        professionalLinksNote: "Full bio in progress. Links: LinkedIn · X · Instagram · Email — to be added.",
        sameAs: [],
    },
    {
        slug: "maycee-sturino",
        tier: "guest",
        name: "Dr. Maycee Sturino, D.C.",
        role: "Co-Owner & Chiropractor · Genesis Chiropractic",
        photo: "/assets/images/Maycee-Sturino-DC.webp",
        blurb: "Dr. Maycee Sturino is a Gonstead-certified chiropractor and co-owner of Genesis Chiropractic in Appleton, Wisconsin, alongside her husband, Dr. Alex Sturino. Inspired to enter the field after recovering from a career-threatening powerlifting injury, she specializes in family wellness, prenatal care, and pediatric development, holding Webster Certification through the ICPA. Dr. Sturino is a passionate advocate for natural health, recently featured on the Motherhood Alliance podcast discussing how specialized chiropractic care impacts pregnancy, birth, and child development.",
        shortBio: "Practises the Gonstead method with her husband Dr. Alex Sturino. Webster certified through the ICPA, focused on family wellness, prenatal care and pediatric development.",
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
        photo: "/assets/images/Thomas-Lahart.jpeg",
        blurb: "Thomas Lahart is the founder of Flight Foods, a Tampa-based Catholic nutritional supplement brand uniting faith, fitness, and clean nutrition. Starting the company from his Auburn University dorm in 2020, Thomas bootstrapped his vision into a nationwide e-commerce success. An athlete and entrepreneur, he saw a gap in the market for transparent, high-performance supplements without proprietary blends or artificial fillers. Driven by a mission to help people become \"Fit for the Kingdom\" and honor their bodies as temples, Thomas provides a unique perspective on integrating spiritual well-being with physical performance and building community-focused, mission-driven brands.",
        shortBio: "Started Flight Foods from a college dorm room in 2020 and built it on fully disclosed dosing, no proprietary blends and no artificial sweeteners. Writes on ingredient quality and training as stewardship.",
        specialties: ["Mission-driven entrepreneurship, sports nutrition, clean supplementation, and the intersection of faith and fitness"],
        affiliatedPartnerSlug: "flight-foods",
        disclosureText: "Flight Foods is a featured partner on this site. Thomas was not paid for his article and did not pay to appear here.",
        professionalUrl: "https://flight-foods.com/",
        sameAs: [],
    },
];
