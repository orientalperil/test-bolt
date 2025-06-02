import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {type PokemonResponse} from "~/lib/responseTypes";

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);

  async function getRandomPokemon(): Promise<PokemonResponse> {
    try {
      const response = await fetch('/api/pokemon/random');
      return await response.json() as PokemonResponse;
    } catch (error) {
      alert('Server had a problem')
    }
  }

  const changePokemon = useCallback(async () => {
    const pokemon = await getRandomPokemon()
    setPokemon(pokemon)
  }, []);

  useEffect(() => {
    void (async () => {
      await changePokemon()
    })();
  }, [changePokemon]);

  return (
    <>
      {pokemon ? (
        <div className="flex flex-1 items-center">
          <div className="relative">
            <img src="/pokedex.png" />
            <div className="absolute pokedex-left-view">
              <div className="flex flex-col p-2">
                <div className="flex justify-between">
                  <div className="font-semibold">{pokemon.name}</div>
                  <div>N° {pokemon.number}</div>
                </div>
                <div className="mt-1">
                  <div>{pokemon.type}</div>
                  <div className="mt-1">{pokemon.description}</div>
                </div>
                <div className="flex justify-between mt-1 px-6">
                  <div className="flex flex-col">
                    <div className="font-semibold">Height</div>
                    <div>{pokemon.height}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-semibold">Weight</div>
                    <div>{pokemon.weight}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute pokedex-right-view bg-white flex justify-center items-center">
              <img src="/pikachu.png" height="135" width="144" />
            </div>
            <div className="absolute pokedex-search-button flex items-center justify-center pokedex-text">
              <button onClick={changePokemon} className="font-semibold">Search</button>
            </div>
            <div className="absolute pokedex-view-button flex items-center justify-center pokedex-text">
              <Link href={`/pokedex/${pokemon.id}`} className="font-semibold">View more</Link>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
