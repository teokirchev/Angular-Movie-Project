export class Movie {

    constructor(id: string, name: string, year: number, imageUrl: string, isPremium: boolean, details: string, owner: string, likesCount: number = 0, movieLikedBy: string[] = []) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.imageUrl = imageUrl;
        this.isPremium = isPremium;
        this.details = details;
        this.owner = owner;
        this.likesCount = likesCount;
        this.movieLikedBy = movieLikedBy;
    }
    id?: string;
    name: string;
    year: number;
    imageUrl: string;
    isPremium: boolean;
    details: string;
    owner: string;
    likesCount: number;
    movieLikedBy: string[];
}