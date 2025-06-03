import {head} from '@vercel/blob';
import clone from "lodash/clone";
import zip from "lodash/zip";

async function convertPathnamesToUrls(obj: object, keys: string[]) {
  const cloned: Record<string, string> = clone(obj)
  const pathnames = keys.map((k): string => cloned[k])
  const promises = pathnames.map(async (p: string) => {
    if (!p) {
      return new Promise((resolve) => {
        resolve({url: ""});
      })
    }
    try {
      const blob = await head(p)
      return new Promise((resolve) => {
        resolve(blob);
      })
    } catch (error) {
      return new Promise((resolve) => {
        resolve({url: ""});
      })
    }
  })
  const blobs: Record<string, string>[] = await Promise.all(promises)
  for (const [key, blob] of zip(keys, blobs)) {
    cloned[`${key}Url`] = blob.url
  }
  return cloned
}

async function getPokemonResponse(pokemon: object) {
  return await convertPathnamesToUrls(pokemon, ['pokemonPhoto', 'evolutionPhoto'])
}

const pokemonTypes = [
  'Bug',
  'Dark',
  'Dragon',
  'Electric',
  'Fairy',
  'Fighting',
  'Fire',
  'Flying',
  'Ghost',
  'Grass',
  'Ground',
  'Ice',
  'Normal',
  'Poison',
  'Psychic',
  'Rock',
  'Steel',
  'Water',
]

export {convertPathnamesToUrls, getPokemonResponse, pokemonTypes}
