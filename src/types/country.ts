export type Country = {
  code: string;
  name: string;
  phone: string;
  capital: string | null;
  emoji: string;
  continent: {
    name: string;
  };
  languages: Language[];
  currencies: string[];
  states: State[];
  subdivisions: Subdivision[];
};

type Language = {
  code: string;
  name: string;
};

type State = {
  name: string;
};

type Subdivision = {
  name: string;
};
