import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {type PokemonResponse, type  BlobResponse} from "~/lib/responseTypes";
import {useRouter} from "next/router";
import { FaArrowLeft, FaPencilAlt, FaTrash } from "react-icons/fa";

export default function Detail() {
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const [photo, setPhoto] = useState<string>('')
  const [evolutionPhoto, setEvolutionPhoto] = useState<string>('')
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
      if (pokemon) {
        setPokemon(pokemon)
        setPhoto(pokemon.pokemonPhotoUrl)
        setEvolutionPhoto(pokemon.evolutionPhotoUrl)
      }
    })();
  }, [getPokemon]);

  return (
    <>
      {pokemon ? (
        <div className="bg-dark text-white rounded-lg my-8 p-8 max-w-7xl">
          <div className="flex justify-between">
            <Link href="/pokedex"><FaArrowLeft/></Link>
            <div>
              <Link href="/pokedex/edit">
                <button type="button"
                        className="text-white bg-gray-solid font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  <FaPencilAlt className="react-icons-align-text mr-2"/>
                  Edit
                </button>
              </Link>
              <button type="button"
                      className="text-white bg-gray-solid font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <FaTrash className="react-icons-align-text mr-2"/>
                Delete
              </button>
            </div>
          </div>
          <div className="flex gap-48 justify-between">
            <div>
              <img src="/pikachu.png" height="447" width="476" />
            </div>
            <div className="bg-gray-solid rounded-lg p-6">
              <h2 className="text-lg font-semibold">{pokemon.name}</h2>
              <div>N° {pokemon.number}</div>
              <div className="text-orange-400">{pokemon.type}</div>
              <div>{pokemon.description}</div>
              <img src={photo} />
              <img src={evolutionPhoto} />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
