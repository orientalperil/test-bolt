import type { NextApiRequest, NextApiResponse } from "next";
import {db} from "~/server/db"
import {type ErrorResponse, type PokemonResponse} from "~/lib/responseTypes";
import {getPokemonResponse} from "~/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonResponse[] | PokemonResponse | ErrorResponse>,
) {
  if (req.method === 'GET') {
    try {
      const pokemon = await db.pokemon.findUnique({
        where: {
          id: Number(req.query.id),
        },
      })
      const p = await getPokemonResponse(pokemon)
      res.status(200).json(p);
    } catch (error) {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedPokemon = await db.pokemon.update({
        where: { id: Number(req.query.id) },
        data: req.body,
      })
      const p = await getPokemonResponse(updatedPokemon)
      return res.status(200).json(p);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update pokemon' });
    }
  } else if (req.method === 'DELETE') {
    const { id: deleteId } = req.query;
    if (!deleteId) {
      return res.status(400).json({ error: 'ID is required' });
    }
    await db.pokemon.delete({
      where: { id: Number(deleteId) },
    });
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
