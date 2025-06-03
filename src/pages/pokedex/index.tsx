import Link from "next/link";
import {type ChangeEvent, useCallback, useEffect, useState} from "react";
import {type PokemonResponse} from "~/lib/types";
import { FaPlusCircle } from "react-icons/fa";
import debounce from "lodash/debounce";
import {pokemonTypes} from "~/lib/utils";

export default function Pokedex() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('');
  const [pokemon, setPokemon] = useState<PokemonResponse[]>([]);

  async function getPokemon(query, type): Promise<PokemonResponse[]> {
    try {
      const response = await fetch(`/api/pokemon?query=${query}&type=${type}`);
      return await response.json() as PokemonResponse[];
    } catch (error) {
      alert('Server had a problem')
    }
  }

  const performSearch = useCallback(
    debounce(async (query, type) => {
      const pokemon = await getPokemon(query, type)
      setPokemon(pokemon)
    }, 300),
    []
  );

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    await performSearch(query, type);
  };

  const options = pokemonTypes.map((t) => ({value: t, label: t}));
  options.unshift({value: '', label: 'Type'})

  const handleTypeChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value
    setType(type);
    await performSearch(query, type);
  };


  useEffect(() => {
    void (async () => {
      const pokemon = await getPokemon('', '')
      setPokemon(pokemon)
    })();
  }, []);

  return (
    <>
      {pokemon ? (
        <div className="bg-dark text-white rounded-lg my-8 p-8 max-w-7xl">
          <div className="text-2xl font-bold mb-4">Pokedex</div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col lg:flex-row gap-6 h-10">
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input className="block w-full py-2.5 ps-10 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                       placeholder="Search Pokemon"
                       value={query}
                       onChange={handleSearch}/>
              </div>

              <div className="w-60">
                <select className="bg-gray-solid text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={type}
                  onChange={handleTypeChange}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Link href="/pokedex/create">
              <button type="button"
                      className="text-white bg-gray-solid font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <FaPlusCircle className="react-icons-align-text mr-2"/>
                Create New
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {pokemon.map(pokemon => (
              <Link key={pokemon.id} href={`/pokedex/${pokemon.id}`}>
                <div key={pokemon.id} className="bg-gray-solid p-6 px-16 rounded-lg flex flex-col items-center">
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
