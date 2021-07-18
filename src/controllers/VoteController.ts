import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL } from '../constants';
import { vote } from '../cli/vote';

class VoteController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    vote = async (identity: string, receiver: string, upvote: null | string, downvote: null | string) => {
        
        let epoch_key: any;
        let transaction: any;
        let proof: any;
        
        await vote({
            contract: UNIREP_SOCIAL,
            eth_privkey: DEPLOYER_PRIV_KEY,
            epoch_key: receiver,
            epoch_key_nonce: 0, // should be changeable
            identity,
            upvote_value: upvote == null ? null : parseInt(upvote),
            downvote_value: downvote == null ? null : parseInt(downvote),
            // min_rep
        }).then((ret) => {
            epoch_key = (ret.epk != null) ? ret.epk : 'error';
            transaction = (ret.transaction != null) ? ret.transaction : 'error';
            proof = (ret.proof != null) ? ret.proof : 'error';
        });

        return {epoch_key, transaction, proof};
    }
  }

  export = new VoteController();