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

// Generate 40 artworks and group them by category
const generateAlbums = (): Album[] => {
    const artworks: AlbumArtwork[] = [];

    for (let i = 1; i <= 40; i++) {
        // Distribute images roughly evenly across categories
        const category = CATEGORIES[i % CATEGORIES.length];

        // Seed parameter ensures deterministic but fully distinct random images for all 40 artworks 
        const seedValue = `arvishwa-${i * 13}`;

        artworks.push({
            id: `art-${i}`,
            title: TITLES[i % TITLES.length] + (i > TITLES.length ? ` ${Math.floor(i / TITLES.length)}` : ''),
            year: 2021 + (i % 6), // 2021-2026
            category,
            image: `https://picsum.photos/seed/${seedValue}/800/1000`,
        });
    }

    // Group by category into albums
    return CATEGORIES.map(category => ({
        name: category,
        artworks: artworks.filter(art => art.category === category)
    }));
};

export const albums = generateAlbums();
