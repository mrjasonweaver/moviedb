export interface IMovie {
  id: string;
  genre: string;
  actors: string[];
  title: string;
  year: number;
  rating: number;
}

export const initialMovie: IMovie = {
  id: '0',
  genre: 'Horror',
  actors: [ 'John Wayne', 'John Doe' ],
  title: 'Example Movie',
  year: 1992,
  rating: 5
};

export const newMovie: IMovie = {
  id: '1',
  genre: '',
  actors: [],
  title: '',
  year: 1940,
  rating: 0
};
