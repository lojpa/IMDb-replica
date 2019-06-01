export enum MovieType {
    movie,
    tvShow
}

export class Movie {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    releaseDate: Date;
    cast: Array<string>; // Array<Actor>
    rating: number;
    actors: any;
    movieType: MovieType;
}
