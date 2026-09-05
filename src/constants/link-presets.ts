import { LinkPreset, type NavbarLink } from "@/types/config";
import { i18n } from "@i18n/translation";
import I18nKey from "@i18n/i18nKey";


export const LinkPresets: { [key in LinkPreset]: NavbarLink } = {
    [LinkPreset.Home]: {
        name: i18n(I18nKey.home),
        url: "/",
        icon: "material-symbols:home",
        description: "Twilight - A simple, clean, and beautiful blog theme.",
    },
    [LinkPreset.Archive]: {
        name: "Articles",
        url: "/articles/",
        icon: "material-symbols:article",
        description: "A chronological list of all published articles.",
    },
    [LinkPreset.Projects]: {
        name: i18n(I18nKey.projects),
        url: "/projects/",
        icon: "material-symbols:work",
        description: i18n(I18nKey.projectsSubtitle),
    },
    [LinkPreset.Skills]: {
        name: i18n(I18nKey.skills),
        url: "/skills/",
        icon: "material-symbols:psychology",
        description: i18n(I18nKey.skillsSubtitle),
    },
    [LinkPreset.Timeline]: {
        name: i18n(I18nKey.timeline),
        url: "/timeline/",
        icon: "material-symbols:timeline",
        description: i18n(I18nKey.timelineSubtitle),
    },
    [LinkPreset.Diary]: {
        name: i18n(I18nKey.diary),
        url: "/diary/",
        icon: "material-symbols:book",
        description: i18n(I18nKey.diarySubtitle),
    },
    [LinkPreset.Albums]: {
        name: i18n(I18nKey.albums),
        url: "/albums/",
        icon: "material-symbols:photo-library",
        description: i18n(I18nKey.albumsSubtitle),
    },
    [LinkPreset.Anime]: {
        name: i18n(I18nKey.anime),
        url: "/anime/",
        icon: "material-symbols:movie",
        description: "A list of anime I have watched.",
    },
    [LinkPreset.Friends]: {
        name: "Contributors",
        url: "/friends/",
        icon: "material-symbols:group",
        description: "Now or Never is a publication focused on health, fitness, nutrition, and living with intention. We collaborate with brands, professionals, and practitioners who value clarity over hype and substance over trends. Our contributors include supplement brands, health professionals, and wellness experts who align with our editorial standards and mission.",
    },
    [LinkPreset.About]: {
        name: "About",
        url: "/about/",
        icon: "material-symbols:info",
        description: "Now or Never covers health, fitness, nutrition, and intentional living — learn about our mission and editorial standards.",
    },
};