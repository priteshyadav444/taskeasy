export interface SharedState {
  showLoading: boolean;
  showLogoLoading:boolean;
  errorMessage: string; 
}

export const initialState: SharedState = {
  showLoading: false,
  showLogoLoading:false,
  errorMessage: '',
};
