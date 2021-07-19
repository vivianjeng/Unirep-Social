import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL } from '../constants';
import { userStateTransition } from '../cli/userStateTransition';
import { epochTransition } from '../cli/epochTransition';

class TransitionController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    userStateTransition = async (identity: string) => {
        
        let current_epoch: any;
        let transaction: any;
        
        await userStateTransition({
            contract: UNIREP_SOCIAL,
            eth_privkey: DEPLOYER_PRIV_KEY,
            identity,
        }).then((ret) => {
            current_epoch = (ret.currentEpoch != null) ? ret.currentEpoch : 'error';
            transaction = (ret.transaction != null) ? ret.transaction : 'error';
        });

        return {current_epoch, transaction};
    }

    epochTransition = async () => {
        
        let end_epoch: any;
        let transaction: any;
        
        await epochTransition({
            contract: UNIREP_SOCIAL,
            eth_privkey: DEPLOYER_PRIV_KEY,
        }).then((ret) => {
            end_epoch = (ret.currentEpoch != null) ? ret.currentEpoch : 'error';
            transaction = (ret.transaction != null) ? ret.transaction : 'error';
        });

        return {end_epoch, transaction};
    }
  }

  export = new TransitionController();