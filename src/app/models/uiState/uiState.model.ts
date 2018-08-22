export interface IUiState {
  actionOngoing: boolean;
  isSelected: boolean;
  message: string;
}

export const initialUiState: IUiState = {
  actionOngoing: false,
  isSelected: false,
  message: ''
};

export interface IParams {
  selected: string;
  searchTerm: string;
}

export const params: IParams = {
  selected: '',
  searchTerm: ''
};
