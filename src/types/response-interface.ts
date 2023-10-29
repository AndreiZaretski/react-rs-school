export interface ResponseData {
  info: InfoData;
  results: ResponseResult[];
}

export interface ResponseResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date | string;
}

export interface InfoData {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
