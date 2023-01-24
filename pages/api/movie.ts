import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGet(req, res);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const movie_info = await prisma.movie.findFirst({
    where: {
      id: Number(req.query.id),
    },
    orderBy: {
      created_at: 'asc',
    },
  });

  res.send(movie_info);
}
