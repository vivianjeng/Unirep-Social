import { NextFunction, Request, Response, Router } from 'express';
import { assert } from 'node:console';
import StateTransitionController from '../controllers/StateTransitionController';

class StateTransitionRouter {
  private _router = Router();
  private _controller = StateTransitionController;

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
    this._router.get('/:method', async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.params.method === 'user') {
                const result = await this._controller.userStateTransition(
                    req.query.identity!.toString());
                res.status(200).json(result);
            } else {
                assert(req.params.method === 'epoch');
                const result = await this._controller.epochTransition();
                res.status(200).json(result);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    });
  }
}

export = new StateTransitionRouter().router;