import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL, DEFAULT_ETH_PROVIDER, add0x } from '../constants';
import Unirep from "../artifacts/contracts/Unirep.sol/Unirep.json";
import UnirepSocial from '../artifacts/contracts/UnirepSocial.sol/UnirepSocial.json';
import { ethers } from 'ethers';
import { Attestation } from '../database/models/vote'

class VoteController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    vote = async (d: any) => {
      // decode data from d
      const data = JSON.parse(JSON.stringify(d), (key, value) => {
        if (typeof value === 'string' && /^\d+n$/.test(value)) {
          return BigInt(value.substr(0, value.length - 1))
        }
        return value
      });
      
      const provider = new ethers.providers.JsonRpcProvider(DEFAULT_ETH_PROVIDER)
      const wallet = new ethers.Wallet(DEPLOYER_PRIV_KEY, provider)
      const unirepSocialContract = new ethers.Contract(
          UNIREP_SOCIAL,
          UnirepSocial.abi,
          wallet,
      )
      const unirepAddress = await unirepSocialContract.unirep()
      const unirepContract = new ethers.Contract(
          unirepAddress,
          Unirep.abi,
          provider,
      )

      const attestingFee = await unirepContract.attestingFee()
      const attesterId = await unirepContract.attesters(unirepSocialContract.address)
      if (attesterId.toNumber() == 0) {
          console.error('Error: attester has not registered yet')
          return
      }

      // upvote or downvote to epoch key
      const attestationToEpochKey = new Attestation(
        BigInt(attesterId),
        BigInt(data.upvote),
        BigInt(data.downvote),
        data.graffiti,
        data.overwriteGraffiti,
      )

      // Sign the message
      const message = ethers.utils.solidityKeccak256(["address", "address"], [wallet.address, unirepAddress])
      const attesterSig = await wallet.signMessage(ethers.utils.arrayify(message))

      // set vote fee
      const voteFee = attestingFee.mul(2)

      console.log(`Attesting to epoch key ${data.receiver} with pos rep ${data.upvote}, neg rep ${data.downvote} and graffiti ${data.graffiti.toString(16)} (overwrite graffit: ${data.overwriteGraffiti})`)
      let tx
      try {
          tx = await unirepSocialContract.vote(
              attesterSig,
              attestationToEpochKey,
              BigInt(add0x(data.receiver)),
              BigInt(add0x(data.epk)),
              data.nullifiers,
              data.publicSignals,
              data.proof,
              { value: voteFee, gasLimit: 3000000 }
          )
      } catch(e) {
          console.error('Error: the transaction failed')
          if (e.message) {
              console.error(e.message)
          }
          return
      }

      return {transaction: tx.hash};
    }
  }

  export = new VoteController();