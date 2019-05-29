export class Movie {

    constructor(id: string, title: string, description: string, cast: Array<string>, image: string = '', rating: number = 3) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.releaseDate = new Date();
        this.cast = cast;
        this.rating = rating;
    }

    id: string;
    title: string;
    image: string;
    description: string;
    releaseDate: Date;
    cast: Array<string>; // Array<Actor>
    rating: number;
}
