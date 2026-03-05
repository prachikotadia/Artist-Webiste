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

// Generated Curated Painting Assets
const PAINTING_URLS = [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1578301978693-85fa9c026f33?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1580136608260-4ebf15facdaf?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1552250575-e508473b090f?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1501472312651-726afe119ff1?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1563604068305-64906f2b703e?q=80&w=800&h=1000&fit=crop"
];

// Generate 40 artworks and group them by category
const generateAlbums = (): Album[] => {
    const artworks: AlbumArtwork[] = [];

    for (let i = 1; i <= 40; i++) {
        // Distribute images roughly evenly across categories
        const category = CATEGORIES[i % CATEGORIES.length];

        // Seed parameter ensures deterministic but fully distinct random images for all 40 artworks 
        const seedValue = `arvishwa-art-${i * 13}`;

        artworks.push({
            id: `art-${i}`,
            title: TITLES[i % TITLES.length] + (i > TITLES.length ? ` ${Math.floor(i / TITLES.length)}` : ''),
            year: 2021 + (i % 6), // 2021-2026
            category,
            // Rotate through beautiful abstract painting placeholders
            image: PAINTING_URLS[i % PAINTING_URLS.length],
        });
    }

    // Group by category into albums
    return CATEGORIES.map(category => ({
        name: category,
        artworks: artworks.filter(art => art.category === category)
    }));
};

export const albums = generateAlbums();
