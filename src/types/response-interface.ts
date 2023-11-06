export interface BeerSort {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Characteristic;
  boil_volume: Characteristic;
  method: {
    mash_temp: [
      {
        temp: Characteristic;
        duration: number;
      },
    ];
    fermentation: {
      temp: Characteristic;
    };
    twist: null;
  };
  ingredients: {
    malt: Malt[];
    hops: Hops[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

interface Hops extends Malt {
  add: string;
  attribute: string;
}

interface Malt {
  name: string;
  amount: Characteristic;
}

interface Characteristic {
  value: number;
  unit: string;
}
