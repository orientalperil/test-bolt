import type { NextApiRequest, NextApiResponse } from "next";
import {db} from "~/server/db"
import {type ErrorResponse, type PokemonResponse} from "~/lib/responseTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonResponse[] | PokemonResponse | ErrorResponse>,
) {
  if (req.method === 'GET') {
    try {
      const pokemon = await db.pokemon.findMany() as PokemonResponse[];
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pokemon' });
    }
  } else if (req.method === 'POST') {
    try {
      const pokemon = await db.pokemon.create({
        data: req.body,
      }) as PokemonResponse;
      res.status(201).json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create pokemon' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
