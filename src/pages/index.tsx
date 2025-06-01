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
              <p>{pokemon.name}</p>
            </div>
            <div className="absolute pokedex-right-view"></div>
            <div className="absolute pokedex-search-button flex items-center justify-center">
              <button onClick={changePokemon}>Search</button>
            </div>
            <div className="absolute pokedex-view-button flex items-center justify-center">
              <Link href={`/pokedex/${pokemon.id}`}>View more</Link>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
