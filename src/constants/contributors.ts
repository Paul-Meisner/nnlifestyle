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
        role: "[Degree and licensure] · Genesis Chiropractic, Appleton, WI",
        photo: "",
        blurb: "[BIO — 60–100 words, pending sign-off. Lead with clinical credentials and years in practice, then specialty, then what perspective she brings here specifically: Gonstead method, Webster certification, pediatric and prenatal care.]",
        specialties: ["[specialty areas — to be confirmed]"],
        affiliatedPartnerSlug: "genesis-chiropractic",
        disclosureText: "Dr. Maycee's practice, Genesis Chiropractic, is a featured partner on this site. She was not paid for this article and did not pay to appear.",
        professionalLinksNote: "Professional site · Professional profile — to be added",
        sameAs: [],
    },
    {
        slug: "thomas-lahart",
        tier: "guest",
        name: "Thomas Lahart",
        role: "[Role] · Flight Foods",
        photo: "",
        blurb: "[BIO — 60–100 words, pending sign-off. What he does at Flight Foods, his background, and what makes his angle worth reading — years in the field, what he's actually built or done.]",
        specialties: ["[subject areas — to be confirmed]"],
        affiliatedPartnerSlug: "flight-foods",
        disclosureText: "Flight Foods is a featured partner on this site. Thomas was not paid for his article and did not pay to appear here.",
        professionalLinksNote: "Professional site — to be added",
        sameAs: [],
    },
];
