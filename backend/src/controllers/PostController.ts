import ErrorHandler from '../ErrorHandler';

import { DEPLOYER_PRIV_KEY, UNIREP_SOCIAL, DEFAULT_ETH_PROVIDER, add0x } from '../constants';
import Unirep from "../artifacts/contracts/Unirep.sol/Unirep.json";
import UnirepSocial from '../artifacts/contracts/UnirepSocial.sol/UnirepSocial.json';
import { ethers } from 'ethers';
import Post, { IPost } from "../database/models/post";

class PostController {
    defaultMethod() {
      throw new ErrorHandler(501, 'API: Not implemented method');
    }

    listAllPosts = async () => {
        // let posts: any;
        // await listAllPosts({
        //     contract: UNIREP_SOCIAL,
        // }).then((ret) => {
        //     posts = ret;
        // });

        // return posts;
    }

    publishPost = async (d: any) => { // should have content, epk, proof, minRep, nullifiers, publicSignals
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
      
      const newpost: IPost = new Post({
        content: data.content,
        // TODO: hashedContent
        epochKey: data.epk,
        epkProof: data.proof.map((n)=>add0x(BigInt(n).toString(16))),
        proveMinRep: data.minRep !== 0 ? true : false,
        minRep: Number(data.minRep),
        comments: [],
        status: 0
      });

      const attestingFee = await unirepContract.attestingFee()

      let tx
      try {
          tx = await unirepSocialContract.publishPost(
              BigInt(add0x(newpost._id.toString())), 
              BigInt(add0x(data.epk)),
              data.content, 
              data.nullifiers,
              data.publicSignals, 
              data.proof,
              { value: attestingFee, gasLimit: 1000000 }
          )
      } catch(e) {
          console.error('Error: the transaction failed')
          if (e.message) {
              console.error(e.message)
          }
          return
      }
      
      return {transaction: tx.hash, postId: newpost._id};
    }
  }

  export = new PostController();