import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL } from '../constants';
// import { leaveComment } from '../cli/leaveComment';

class CommentController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    leaveComment = async (identity: string, content: string, post_id: string) => {
        // let epoch_key: any;
        // let transaction: any;
        // let proof: any;
        
        // await leaveComment({
        //     contract: UNIREP_SOCIAL,
        //     eth_privkey: DEPLOYER_PRIV_KEY,
        //     epoch_key_nonce: 0, // should be changeable
        //     identity,
        //     text: content,
        //     post_id,
        //     // min_rep
        // }).then((ret) => {
        //     epoch_key = (ret.epk != null) ? ret.epk : 'error';
        //     transaction = (ret.transaction != null) ? ret.transaction : 'error';
        //     proof = (ret.proof != null) ? ret.proof : 'error';
        // });

        // return {epoch_key, transaction, proof};
    }
  }

  export = new CommentController();