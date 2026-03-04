export type ArtworkStatus = "Available" | "Sold";
export type ArtworkCategory = "Originals" | "Commissions" | "Prints";

export interface Artwork {
    id: string;
    title: string;
    year: number;
    medium: string;
    size: string;
    status: ArtworkStatus;
    image: string;
    category: ArtworkCategory;
    collectionTag?: string;
    featured?: boolean;
}

export const artworks: Artwork[] = [
    {
        id: "art-01",
        title: "Ethereal Echo",
        year: 2023,
        medium: "Oil on Canvas",
        size: "48 x 60 in",
        status: "Available",
        image: "/images/art-01.jpg",
        category: "Originals",
        collectionTag: "Ethereal Series",
        featured: true,
    },
    {
        id: "art-02",
        title: "Silent Horizon",
        year: 2022,
        medium: "Acrylic on Panel",
        size: "36 x 36 in",
        status: "Sold",
        image: "/images/art-02.jpg",
        category: "Originals",
        collectionTag: "Horizons",
        featured: true,
    },
    {
        id: "art-03",
        title: "Golden Hour Study",
        year: 2024,
        medium: "Oil on Linen",
        size: "24 x 30 in",
        status: "Available",
        image: "/images/art-03.jpg",
        category: "Originals",
        collectionTag: "Ethereal Series",
        featured: true,
    },
    {
        id: "art-04",
        title: "Whispering Pines",
        year: 2023,
        medium: "Charcoal & Acrylic",
        size: "40 x 50 in",
        status: "Available",
        image: "/images/art-04.jpg",
        category: "Originals",
        featured: true,
    },
    {
        id: "art-05",
        title: "Tide Pool Reflections",
        year: 2021,
        medium: "Watercolor & Gouache",
        size: "18 x 24 in",
        status: "Sold",
        image: "/images/art-05.jpg",
        category: "Originals",
        collectionTag: "Coastal Memories",
        featured: false,
    },
    {
        id: "art-06",
        title: "Urban Geometry",
        year: 2024,
        medium: "Mixed Media on Canvas",
        size: "60 x 72 in",
        status: "Available",
        image: "/images/art-06.jpg",
        category: "Commissions",
        featured: true,
    },
    {
        id: "art-07",
        title: "Symphony in Blue",
        year: 2022,
        medium: "Oil on Canvas",
        size: "30 x 40 in",
        status: "Sold",
        image: "/images/art-07.jpg",
        category: "Originals",
        featured: false,
    },
    {
        id: "art-08",
        title: "Autumn Canopy",
        year: 2023,
        medium: "Acrylic on Linen",
        size: "36 x 48 in",
        status: "Available",
        image: "/images/art-08.jpg",
        category: "Prints",
        featured: false,
    },
    {
        id: "art-09",
        title: "Midnight Blossom",
        year: 2024,
        medium: "Oil on Wood",
        size: "20 x 20 in",
        status: "Available",
        image: "/images/art-09.jpg",
        category: "Originals",
        collectionTag: "Nocturnes",
        featured: false,
    },
    {
        id: "art-10",
        title: "Desert Mirage",
        year: 2021,
        medium: "Sand & Acrylic",
        size: "48 x 48 in",
        status: "Sold",
        image: "/images/art-10.jpg",
        category: "Commissions",
        featured: false,
    },
    {
        id: "art-11",
        title: "Luminous Void",
        year: 2024,
        medium: "Resin & Pigment",
        size: "24 x 24 in",
        status: "Available",
        image: "/images/art-11.jpg",
        category: "Originals",
        featured: false,
    },
    {
        id: "art-12",
        title: "Spring Awakening",
        year: 2023,
        medium: "Oil on Canvas",
        size: "30 x 40 in",
        status: "Available",
        image: "/images/art-12.jpg",
        category: "Prints",
        featured: true,
    }
];
