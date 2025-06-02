import { head } from '@vercel/blob';
import clone from "lodash/clone";
import zip from "lodash/zip";
import {type PokemonResponse} from "~/lib/responseTypes";


async function convertPathnamesToUrls(obj, keys) {
  const cloned = clone(obj)
  const pathnames = keys.map((k) => cloned[k])
  const promises = pathnames.map((p) => {
    if (!p) {
      return new Promise((resolve) => {
        resolve({url: ""});
      })
    }
    return head(p)
  })
  const blobs = await Promise.all(promises)
  for (const [key, blob] of zip(keys, blobs)) {
    cloned[`${key}Url`] = blob.url
  }
  return cloned
}

async function getPokemonResponse(pokemon) {
  return await convertPathnamesToUrls(pokemon, ['pokemonPhoto', 'evolutionPhoto']) as PokemonResponse
}

export {convertPathnamesToUrls, getPokemonResponse}
