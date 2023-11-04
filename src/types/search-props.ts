import { ResponseResult, InfoData } from './response-interface';

export interface SearchPropsData {
  data: ResponseResult[];
  info: InfoData | null;
}

export interface SearchProps extends SearchPropsData {
  onResponse: (results: ResponseResult[], info: InfoData | null) => void;
  onLoading: (loading: boolean) => void;
  isLoading: boolean;
}
