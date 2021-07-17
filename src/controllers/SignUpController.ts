import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL } from '../constants';
import { genUnirepIdentity } from '../cli/genUnirepIdentity';
import { userSignup } from '../cli/userSignUp';

class SignUpController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    signUp = async () => {
      // genUnirepIdentity
      let id: any;
      let commitment: any;
      await genUnirepIdentity('test').then((ret) => {
        id = ret.id;
        commitment = ret.commitment;
      });

      // userSignup
      let transaction: any;
      let epoch: any;
      await userSignup({
        contract: UNIREP_SOCIAL,
        identity_commitment: commitment,
        eth_privkey: DEPLOYER_PRIV_KEY,
      }).then((ret) => {
        transaction = (ret.transaction != null) ? ret.transaction : 'error';
        epoch = (ret.epoch != null) ? ret.epoch : 'error';
      });

      console.log({id, commitment, transaction, epoch});
      return {id, commitment, transaction, epoch};
    }
  }

  export = new SignUpController();