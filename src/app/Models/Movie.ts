export class Movie {

    constructor
    (id: string,
    name: string,
    year: number,
    imageUrl: string, 
    isPremium: boolean, 
    details: string, 
    owner: string,
    movieLikedBy: string[] = [],
    ratingSum: number | undefined,
    ratingCount: number | undefined,
    averageRating: number | undefined = 0
    ) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.imageUrl = imageUrl;
        this.isPremium = isPremium;
        this.details = details;
        this.owner = owner;
        this.movieLikedBy = movieLikedBy;
        this.ratingSum = ratingSum;
        this.ratingCount = ratingCount;
        this.averageRating = averageRating
    }
    id?: string;
    name: string;
    year: number;
    imageUrl: string;
    isPremium: boolean;
    details: string;
    owner: string;
    movieLikedBy: string[];
    ratingSum: number | undefined;
    ratingCount: number | undefined;
    averageRating: number | undefined = 0;
}