import { Router } from 'express';
import SignUpRouter from './SignUpRouter';

class MasterRouter {
  private _router = Router();
  private _signupRouter = SignUpRouter;

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
  }
}

export = new MasterRouter().router;