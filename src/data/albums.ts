export type AlbumCategory =
    | "Acrylic"
    | "Oil"
    | "Sketch"
    | "Charcoal"
    | "Watercolor"
    | "Gold Leaf"
    | "Portraits"
    | "Landscapes"
    | "Abstract"
    | "Mixed Media";

export interface AlbumArtwork {
    id: string;
    title: string;
    year: number;
    category: AlbumCategory;
    image: string;
}

export interface Album {
    name: AlbumCategory;
    artworks: AlbumArtwork[];
}

const CATEGORIES: AlbumCategory[] = [
    "Acrylic", "Oil", "Sketch", "Charcoal",
    "Watercolor", "Gold Leaf", "Portraits",
    "Landscapes", "Abstract", "Mixed Media"
];

const TITLES = [
    "Ethereal Echo", "Silent Horizon", "Golden Hour", "Whispering Pines",
    "Tide Pool", "Urban Geometry", "Symphony", "Autumn Canopy",
    "Desert Mirage", "Ocean Edge", "Winter Silence", "Spring Awakening",
    "Midnight Sun", "Morning Mist", "Celestial Dream", "Fading Ember"
];

const REAL_IMAGES = [
    "4Womens.jpg", "ChamChino1.jpg", "HeartFinal.jpg", "IMG_0378.JPG", "IMG_20220403_211835_739.jpg",
    "IMG_2064.PNG", "IMG_2065.PNG", "IMG_2835.JPG", "IMG_2837.JPG", "IMG_2840.JPG", "IMG_2841.JPG",
    "IMG_2849.JPG", "IMG_3657.JPG", "IMG_4534.JPG", "IMG_4727.JPG", "IMG_5241.JPG", "IMG_5464.PNG",
    "IMG_5467.PNG", "IMG_5468.PNG", "IMG_5469.PNG", "IMG_5474.PNG", "IMG_5475.PNG", "IMG_5496.JPG",
    "IMG_5700.JPG", "IMG_5715.JPG", "IMG_6622.JPG", "IMG_8494.PNG", "LordShiva2.jpg", "MenFaces.jpg",
    "MixMedia2.jpg", "ParthPapaPortrait.jpg", "Piano1.jpg", "PramukhSwamiMaharaj.jpg", "RK1.jpg",
    "RadhaKrishna1.jpg", "RadhaKrishna3.jpg", "RadhaKrishna5.jpg", "StringArt1.jpg", "V1.jpg", "V2.jpg",
    "WaterPotArt.jpg", "WhatsApp Image 2025-06-18 at 13.29.59_21518103.jpg", "WhiteTawaArt.jpg", "photostudio_1737398437640.jpg"
];

// Generate 44 artworks based on real uploaded files and group them by category
const generateAlbums = (): Album[] => {
    const artworks: AlbumArtwork[] = [];

    for (let i = 0; i < REAL_IMAGES.length; i++) {
        // Distribute images roughly evenly across categories
        const category = CATEGORIES[i % CATEGORIES.length];

        // Format the title neatly based on the file name
        let filename = REAL_IMAGES[i];
        let rawTitle = filename.split('.')[0];

        // Basic cleanup: swap underscores to spaces, add spaces before capitals
        rawTitle = rawTitle.replace(/_/g, ' ');
        rawTitle = rawTitle.replace(/([A-Z])/g, ' $1').trim();

        // Capitalize first letter properly
        rawTitle = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

        artworks.push({
            id: `art-${i}`,
            title: rawTitle.length > 3 ? rawTitle : TITLES[i % TITLES.length], // fallback to nice title if filename is just "V1" etc
            year: 2021 + (i % 6), // 2021-2026
            category,
            image: `/images/paintings/${filename}`,
        });
    }

    // Group by category into albums
    return CATEGORIES.map(category => ({
        name: category,
        artworks: artworks.filter(art => art.category === category)
    }));
};

export const albums = generateAlbums();
