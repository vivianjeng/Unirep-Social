import {
    Attestation,
    IAttestation,
    IEpochTreeLeaf,
    UnirepState,
} from './UnirepState'

import {
    IUserStateLeaf,
    Reputation,
    UserState,
} from './UserState'

import {
    genUnirepStateFromContract,
    genUserStateFromContract,
    genUserStateFromParams,
} from './utils'

export {
    Attestation, 
    Reputation,
    UnirepState,
    UserState,
    genUnirepStateFromContract,
    genUserStateFromContract,
    genUserStateFromParams
}
export type {
    IAttestation,
    IEpochTreeLeaf,
    IUserStateLeaf
}
