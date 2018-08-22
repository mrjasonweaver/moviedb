export interface IActor {
  firstName: string;
  lastName: string;
}

export interface IMovie {
  id: number;
  genre: string;
  actors: IActor[];
  title: string;
  year: number;
  rating: number;
  poster: string;
}

export const initialMovie: IMovie = {
  id: 1,
  genre: 'Horror',
  actors: [
    {firstName: 'John', lastName: 'Wayne'},
    {firstName: 'John', lastName: 'Doe'}
  ],
  title: 'Example Movie',
  year: 1992,
  rating: 5,
  poster: 'posterId'
};
