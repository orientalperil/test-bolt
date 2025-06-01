import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {type PokemonResponse} from "~/lib/responseTypes";
import {useRouter} from "next/router";
import { FaArrowLeft } from "react-icons/fa";

export default function Detail() {
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const router = useRouter();

  const getPokemon = useCallback(async (): Promise<PokemonResponse | null> => {
    if (router.query.id) {
      try {
        const response = await fetch(`/api/pokemon/${router.query.id}`);
        return await response.json() as PokemonResponse;
      } catch (error) {
        alert('Server had a problem');
      }
    } else {
      return null
    }
  }, [router.query.id]);

  useEffect(() => {
    void (async () => {
      const pokemon = await getPokemon()
      setPokemon(pokemon)
    })();
  }, [getPokemon]);

  return (
    <>
      {pokemon ? (
        <div className="bg-dark text-white rounded-lg my-8 p-8 max-w-7xl">
          <div>
            <Link href="/pokedex"><FaArrowLeft/></Link>
            <h2 className="text-lg font-semibold">{pokemon.name}</h2>
            <p>{pokemon.number}</p>
            <p>{pokemon.type}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
