import { Router } from 'express';
import SignUpRouter from './SignUpRouter';
import PostRouter from './PostRouter';

class MasterRouter {
  private _router = Router();
  private _signupRouter = SignUpRouter;
  private _postRouter = PostRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/signup', this._signupRouter);
    this._router.use('/post', this._postRouter);
  }
}

export = new MasterRouter().router;