import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const user_board = await prisma.user_board.findMany({
    where: {
      user: req.query.user as string,
    },
    orderBy: {
      created_at: 'asc',
    },
  });

  res.send(user_board);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const { movie_status, user_id, movie_id } = req.body;
  if (!movie_status || !user_id || !movie_id) {
    res.status(200).send('Error');
    return;
  }

  const add = await prisma.user_board.create({
    data: {
      movie_status: req.body.movie_status,
      user: req.body.user_id,
      movie_id: Number(req.body.movie_id),
    },
  });
  res.status(201).send(add);
}
