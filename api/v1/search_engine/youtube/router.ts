import express, { Response, Request, Router } from 'express';
import path from 'path';
import Youtube from './Youtube';
import log from '../../utils/logger';

const youtube = new Youtube();
const router: Router = express.Router();

router.use(express.json());

router.get('/api/v1/youtube', async (req: Request, res: Response) => {
  const title = req.query.title as string | undefined;

  if (!title) {
    return res.status(400).send({
      message: 'Song Title is needed for this request.',
      response: '400 Bad Request',
    });
  }

  try {
    const tracks = await youtube.getLyrics(title);
    res.send(tracks);
  } catch (error) {
    log.error(`Error: ${error as string}`);
    res.status(500).send({
      message: 'An error has occurred.',
      response: '500 Internal Server Error',
    });
  }
});

export default router;
