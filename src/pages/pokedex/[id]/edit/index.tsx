import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {PokemonResponse} from "~/lib/types";
import Form from "~/lib/form";

export default function Create() {
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const [defaultValues, setDefaultValues] = useState({});
  const [imageDefaults, setImageDefaults] = useState({});
  const router = useRouter();
  const {id} = router.query as { id?: string }

  const getPokemon = useCallback(async (): Promise<PokemonResponse | null> => {
    if (id) {
      try {
        const response = await fetch(`/api/pokemon/${id}`);
        return await response.json() as PokemonResponse;
      } catch (error) {
        alert('Server had a problem');
      }
    } else {
      return null
    }
  }, [id]);

  useEffect(() => {
    void (async () => {
      const pokemon = await getPokemon()
      if (pokemon) {
        setPokemon(pokemon)
        setDefaultValues({
          name: pokemon.name,
          number: pokemon.number,
          pokemonPhoto: pokemon.pokemonPhoto,
          type: pokemon.type,
          description: pokemon.description,
          height: pokemon.height,
          weight: pokemon.weight,
          maleGenderRatio: pokemon.maleGenderRatio,
          femaleGenderRatio: pokemon.femaleGenderRatio,
          abilities: pokemon.abilities,
          eggGroups: pokemon.eggGroups,
          evolutions: pokemon.evolutions,
          evolutionPhoto: pokemon.evolutionPhoto,
        })
        setImageDefaults({
          pokemonPhotoUrl: pokemon.pokemonPhotoUrl,
          evolutionPhotoUrl: pokemon.evolutionPhotoUrl,
        })
      }
    })();
  }, [getPokemon]);

  const onSubmit = async (data) => {
    const response = await fetch(`/api/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    await router.push(`/pokedex/${id}`)
  };

  return (
    <>
      {pokemon ? (
        <div className="bg-dark text-white rounded-lg my-8 p-8 max-w-7xl">
          <div className="text-2xl font-bold mb-4">{pokemon.name}</div>
          <Form onSubmit={onSubmit} buttonText="Update" cancelRedirect={`/pokedex/${id}`} defaultValues={defaultValues} imageDefaults={imageDefaults}/>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
