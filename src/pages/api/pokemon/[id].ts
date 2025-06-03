import type { NextApiRequest, NextApiResponse } from "next";
import {db} from "~/server/db"
import {type ErrorResponse, type PokemonResponse, type PokemonUpdateRequest} from "~/lib/types";
import {getPokemonResponse} from "~/lib/utils";
import { del } from '@vercel/blob';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonResponse[] | PokemonResponse | ErrorResponse>,
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        error: "Invalid query parameter. 'id' must be a valid numeric value."
      });
    }

    try {
      const pokemon = await db.pokemon.findUnique({
        where: {
          id: Number(id),
        },
      })
      const p = await getPokemonResponse(pokemon)
      res.status(200).json(p);
    } catch (error) {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        error: "Invalid query parameter. 'id' must be a valid numeric value."
      });
    }

    try {
      const body = req.body as PokemonUpdateRequest;
      const updatedPokemon = await db.pokemon.update({
        where: { id: id },
        data: body,
      })
      const p = await getPokemonResponse(updatedPokemon)
      return res.status(200).json(p);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update pokemon' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        error: "Invalid query parameter. 'id' must be a valid numeric value."
      });
    }
    const pokemon = await db.pokemon.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (pokemon.pokemonPhoto) {
      try {
        await del(pokemon.pokemonPhoto)
      } catch (error) {}
    }
    if (pokemon.evolutionPhoto) {
      try {
        await del(pokemon.evolutionPhoto)
      } catch (error) {}
    }
    await db.pokemon.delete({
      where: { id: Number(id) },
    });
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
