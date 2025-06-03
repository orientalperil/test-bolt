type PokemonCreateRequest = {
  name: string,
  number: string,
  pokemonPhoto: string,
  type: string,
  description: string,
  height: string,
  weight: string,
  maleGenderRatio: string,
  femaleGenderRatio: string,
  abilities: string,
  eggGroups: string,
  evolutions: string,
  evolutionPhoto: string,
  createdAt: Date,
  updatedAt: Date,
};

type PokemonUpdateRequest = PokemonCreateRequest

type PokemonResponse = {
  id: number;
  name: string,
  number: string,
  pokemonPhoto: string,
  pokemonPhotoUrl: string,
  type: string,
  description: string,
  height: string,
  weight: string,
  maleGenderRatio: string,
  femaleGenderRatio: string,
  abilities: string,
  eggGroups: string,
  evolutions: string,
  evolutionPhoto: string,
  evolutionPhotoUrl: string,
  createdAt: Date,
  updatedAt: Date,
};

type ErrorResponse = {
  error: string,
};

type BlobResponse = {
  pathname: string,
  url: string,
}

export type { PokemonCreateRequest, PokemonUpdateRequest, PokemonResponse, ErrorResponse, BlobResponse }
