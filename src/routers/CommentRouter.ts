import { NextFunction, Request, Response, Router } from 'express';
import CommentController from '../controllers/CommentController';

class CommentRouter {
  private _router = Router();
  private _controller = CommentController;

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
    this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._controller.leaveComment(req.query.identity!.toString(), req.query.content!.toString(), req.query.post_id!.toString());
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
  }
}

export = new CommentRouter().router;