import express, { Response, Request, Router } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import Musixmatch from './Musixmatch';
import log from '../../utils/logger';

const musixmatch = new Musixmatch();
const router: Router = express.Router();

router.use(express.json());
router.use(cookieParser());

router.get('/api/v1/musixmatch', async (req: Request, res: Response) => {
  const title = req.query.title as string | undefined;
  if (!title) {
    return res.status(400).send({
      message: 'Song Title is needed for this request.',
      response: '400 Bad Request',
    });
  }
  try {
    let userToken = req.cookies.user_token;
    if (!userToken) {
      userToken = await musixmatch.getToken();
      res.cookie('user_token', userToken);
    }
    const tracks = await musixmatch.searchTrack(title, userToken);
    res.send(tracks);
  } catch (error) {
    log.error(`Error: ${error as string}`);
    res.status(500).send({
      message: 'An error has occured.',
      response: '500 Internal Server Error',
    });
  }
});

router.get('/musixmatch/lyrics-search', async (req: Request, res: Response) => {
  const title = req.query.title as string | undefined;
  const artist = req.query.artist as string | undefined;
  if (!title || !artist) {
    return res.status(400).send({
      message: 'Song Title is needed for this request.',
      response: '400 Bad Request',
    });
  }
  try {
    let userToken = req.cookies.user_token;
    if (!userToken) {
      userToken = await musixmatch.getToken();
      res.cookie('user_token', userToken);
    }
    const response = await musixmatch.getLyricsSearch(title, artist, userToken);
    res.send(response);
  } catch (error) {
    log.error(`Error: ${error as string}`);
    res.status(500).send({
      message: 'An error has occured.',
      response: '500 Internal Server Error',
    });
  }
});

export default router;
