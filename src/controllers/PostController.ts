import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL } from '../constants';
import { listAllPosts } from '../cli/listAllPosts';
import { publishPost } from '../cli/publishPost';

class PostController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    listAllPosts = async () => {
        let posts: any;
        await listAllPosts({
            contract: UNIREP_SOCIAL,
        }).then((ret) => {
            posts = ret;
        });

        return posts;
    }

    publishPost = async (identity: string, content: string) => {
        
        let post_id: any;
        let epoch_key: any;
        let transaction: any;
        let proof: any;
        
        await publishPost({
            contract: UNIREP_SOCIAL,
            eth_privkey: DEPLOYER_PRIV_KEY,
            epoch_key_nonce: 0, // should be changeable
            identity,
            text: content,
            // min_rep
        }).then((ret) => {
            post_id = (ret.pid != null) ? ret.pid : 'error';
            epoch_key = (ret.epk != null) ? ret.epk : 'error';
            transaction = (ret.transaction != null) ? ret.transaction : 'error';
            proof = (ret.proof != null) ? ret.proof : 'error';
        });

        return {post_id, epoch_key, transaction, proof};
    }
  }

  export = new PostController();