import { NextFunction, Request, Response, Router } from 'express';
import PostController from '../controllers/PostController';

class PostRouter {
  private _router = Router();
  private _controller = PostController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await this._controller.listAllPosts();
          res.status(200).json(result);
        }
        catch (error) {
          console.log(error);
          next(error);
        }
    });
    this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._controller.publishPost(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
  }
}

export = new PostRouter().router;