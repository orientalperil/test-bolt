import Link from "next/link";
import {useEffect, useState} from "react";
import {type PokemonResponse} from "~/lib/responseTypes";
import { FaPlusCircle } from "react-icons/fa";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<PokemonResponse[]>([]);

  async function getPokemon(): Promise<PokemonResponse[]> {
    try {
      const response = await fetch('/api/pokemon');
      return await response.json() as PokemonResponse[];
    } catch (error) {
      alert('Server had a problem')
    }
  }

  useEffect(() => {
    void (async () => {
      const pokemon = await getPokemon()
      setPokemon(pokemon)
    })();
  }, []);

  return (
    <>
      {pokemon ? (
        <div className="bg-dark text-white rounded-lg my-8 p-8 max-w-7xl">
          <h1 className="text-2xl font-bold mb-4">Pokedex</h1>

          <div className="relative max-w-md">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input className="block w-full p-4 ps-10 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                   placeholder="Search Pokemon" />
          </div>

          <div className="w-40">
            <select className="bg-gray-solid text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <Link href="/pokedex/create">
            <button type="button"
                    className="text-white bg-gray-solid font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <FaPlusCircle className="react-icons-align-text mr-2"/>
              Create New
            </button>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {pokemon.map(pokemon => (
              <Link key={pokemon.id} href={`/pokedex/${pokemon.id}`}>
                <div key={pokemon.id} className="bg-gray-solid p-6 rounded-lg flex flex-col items-center">
                  <img src="/pikachu.png" height="135" width="144" />
                  <div className="mt-4">N° {pokemon.number}</div>
                  <div className="text-lg font-bold">{pokemon.name}</div>
                  <div className="text-orange-400">{pokemon.type}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
