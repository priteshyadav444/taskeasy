export interface SharedState {
  showLoading: boolean;
  showLogoLoading:boolean;
  errorMessage: string; 
  isTaskLoaded:boolean
}

export const initialState: SharedState = {
  showLoading: false,
  showLogoLoading:false,
  errorMessage: '',
  isTaskLoaded : false
};
