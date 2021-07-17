import { NextFunction, Request, Response, Router } from 'express';
import SignUpController from '../controllers/SignUpController';

class SignUpRouter {
  private _router = Router();
  private _controller = SignUpController;

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
          const result = await this._controller.signUp();
          res.status(200).json(result);
        }
        catch (error) {
          console.log(error);
          next(error);
        }
      });
  }
}

export = new SignUpRouter().router;