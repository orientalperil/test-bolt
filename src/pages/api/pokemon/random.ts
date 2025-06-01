import type { NextApiRequest, NextApiResponse } from "next";
import {db} from "~/server/db"
import {type ErrorResponse, type PokemonResponse} from "~/lib/responseTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonResponse[] | PokemonResponse | ErrorResponse>,
) {
  if (req.method === 'GET') {
    try {
      const count = await db.pokemon.count();
      if (count === 0) {
        return res.status(404).json({ error: 'No pokemon found' });
      }

      const randomIndex = Math.floor(Math.random() * count);
      const randomPokemon = await db.pokemon.findMany({
        skip: randomIndex,
        take: 1,
      }) as PokemonResponse[];

      res.status(200).json(randomPokemon[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
