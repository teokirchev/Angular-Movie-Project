export class Movie {

    constructor(id: number, name: string, year: number, imageUrl: string, isPremium: boolean, details: string) {
        this.id = id
        this.name = name;
        this.year = year;
        this.imageUrl = imageUrl;
        this.isPremium = isPremium;
        this.details = details;
    }
    id: number
    name: string;
    year: number;
    imageUrl: string;
    isPremium: boolean;
    details: string;
}