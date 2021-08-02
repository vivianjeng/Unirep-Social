import * as fs from 'fs'
import assert from 'assert'
import lineByLine from 'n-readlines'
import * as path from 'path'
import { SnarkProof, SnarkPublicSignals } from 'libsemaphore'
import { stringifyBigInts, unstringifyBigInts } from 'maci-crypto'

const snarkjs = require("snarkjs")
const zkutilPath = "~/.cargo/bin/zkutil"
const buildPath = "./build"

/*
 * @param circuitPath The subpath to the circuit file (e.g.
 *     test/userStateTransition_test.circom)
 */
// const compileAndLoadCircuit = async (
//     circuitPath: string
// ) => {
//     const circuit = await circom.tester(path.join(
//         __dirname,
//         `../../circuits/${circuitPath}`,
//     ))

//     await circuit.loadSymbols()

//     return circuit
// }

const executeCircuit = async (
    circuit: any,
    inputs: any,
) => {

    const witness = await circuit.calculateWitness(inputs, true)
    await circuit.checkConstraints(witness)
    await circuit.loadSymbols()

    return witness
}

const getSignalByName = (
    circuit: any,
    witness: any,
    signal: string,
) => {

    return witness[circuit.symbols[signal].varIdx]
}

const getSignalByNameViaSym = (
    circuitName: any,
    witness: any,
    signal: string,
) => {
    const symPath = path.join(__dirname, buildPath, `${circuitName}.sym`)
    const liner = new lineByLine(symPath)
    let line
    let index
    let found = false

    while (true) {
        line = liner.next()
        debugger
        if (!line) { break }
        const s = line.toString().split(',')
        if (signal === s[3]) {
            index = s[1]
            found = true
            break
        }
    }

    assert(found)

    if (index !== undefined) {
        return witness[index]
    }
}

const genVerifyEpochKeyProofAndPublicSignals = (
    inputs: any,
) => {
    return genProofAndPublicSignals(
        inputs,
        '/test/verifyEpochKey_test.circom',
        'verifyEpochKeyCircuit.r1cs',
        'verifyEpochKey.wasm',
        'verifyEpochKey.params',
        'verifyEpochKey.zkey',
        false,
    )
}

const genVerifyUserStateTransitionProofAndPublicSignals = (
    inputs: any,
) => {
    return genProofAndPublicSignals(
        inputs,
        '/test/userStateTransition_test.circom',
        'userStateTransitionCircuit.r1cs',
        'userStateTransition.wasm',
        'userStateTransition.params',
        'userStateTransition.zkey',
        false,
    )
}

const genVerifyReputationProofAndPublicSignals = (
    inputs: any,
) => {
    return genProofAndPublicSignals(
        inputs,
        '/test/proveReputation_test.circom',
        'proveReputationCircuit.r1cs',
        'proveReputation.wasm',
        'proveReputation.params',
        'proveReputation.zkey',
        false,
    )
}

const genVerifyReputationFromAttesterProofAndPublicSignals = (
    inputs: any,
) => {
    return genProofAndPublicSignals(
        inputs,
        '/test/proveReputationFromAttester_test.circom',
        'proveReputationFromAttesterCircuit.r1cs',
        'proveReputationFromAttester.wasm',
        'proveReputationFromAttester.params',
        'proveReputationFromAttester.zkey',
        false,
    )
}

/// needs to re-write, no shelljs and file allowed, just store in memory ///
const genProofAndPublicSignals = async (
    inputs: any,
    circuitFilename: string,
    circuitR1csFilename: string,
    circuitWasmFilename: string,
    paramsFilename: string,
    zkeyFileName: string,
    compileCircuit = true,
) => {
    const date = Date.now()
    const paramsPath = path.join(__dirname, buildPath, paramsFilename)
    const circuitR1csPath = path.join(__dirname, buildPath, circuitR1csFilename)
    const circuitWasmPath = path.join(__dirname, buildPath, circuitWasmFilename)
    const inputJsonPath = path.join(__dirname, buildPath + date + '.input.json')
    const witnessPath = path.join(__dirname, buildPath + date + '.witness.wtns')
    const witnessJsonPath = path.join(__dirname, buildPath + date + '.witness.json')
    const proofPath = path.join(__dirname, buildPath + date + '.proof.json')
    const publicJsonPath = path.join(__dirname, buildPath + date + '.publicSignals.json')
    const zkeyPath = path.join(__dirname, buildPath, zkeyFileName)

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(inputs, circuitWasmPath, zkeyPath);
    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    const witness = unstringifyBigInts(JSON.parse(fs.readFileSync(witnessJsonPath).toString()))

    return { proof, publicSignals, witness } // proof, publicsignals should be on chain
}

const verifyProof = async (
    vkeyFileName: string,
    proof: SnarkProof,
    publicSignals: SnarkPublicSignals,
): Promise<boolean> => {
    const vkey = path.join(__dirname, buildPath, vkeyFileName)
    const res = await snarkjs.groth16.verify(vkey, publicSignals, proof)

    return res
}

const verifyEPKProof = (
    proof: any,
    publicSignals: any,
) => {
    // const date = Date.now().toString()
    // const proofFilename = `${date}.verifyEpochKey.proof.json`
    // const publicSignalsFilename = `${date}.verifyEpochKey.publicSignals.json`

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, proofFilename),
    //     JSON.stringify(
    //         stringifyBigInts(proof)
    //     )
    // )

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, publicSignalsFilename),
    //     JSON.stringify(
    //         stringifyBigInts(publicSignals)
    //     )
    // )

    return verifyProof('verifyEpochKeyVk.json', proof, publicSignals)
}

const verifyUserStateTransitionProof = (
    proof: any,
    publicSignals: any,
) => {
    // const date = Date.now().toString()
    // const proofFilename = `${date}.userStateTransition.proof.json`
    // const publicSignalsFilename = `${date}.userStateTransition.publicSignals.json`

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, proofFilename),
    //     JSON.stringify(
    //         stringifyBigInts(proof)
    //     )
    // )

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, publicSignalsFilename),
    //     JSON.stringify(
    //         stringifyBigInts(publicSignals)
    //     )
    // )

    return verifyProof('userStateTransitionVk.json', proof, publicSignals)
}

const verifyProveReputationProof = (
    proof: any,
    publicSignals: any,
) => {
    // const date = Date.now().toString()
    // const proofFilename = `${date}.proveReputation.proof.json`
    // const publicSignalsFilename = `${date}.proveReputation.publicSignals.json`

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, proofFilename),
    //     JSON.stringify(
    //         stringifyBigInts(proof)
    //     )
    // )

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, publicSignalsFilename),
    //     JSON.stringify(
    //         stringifyBigInts(publicSignals)
    //     )
    // )

    return verifyProof('proveReputationVk.json', proof, publicSignals)
}

const verifyProveReputationFromAttesterProof = (
    proof: any,
    publicSignals: any,
) => {
    // const date = Date.now().toString()
    // const proofFilename = `${date}.proveReputationFromAttester.proof.json`
    // const publicSignalsFilename = `${date}.proveReputationFromAttester.publicSignals.json`

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, proofFilename),
    //     JSON.stringify(
    //         stringifyBigInts(proof)
    //     )
    // )

    // fs.writeFileSync(
    //     path.join(__dirname, buildPath, publicSignalsFilename),
    //     JSON.stringify(
    //         stringifyBigInts(publicSignals)
    //     )
    // )

    return verifyProof('proveReputationFromAttesterVk.json', proof, publicSignals)
}

const formatProofForVerifierContract = (
    _proof: SnarkProof,
) => {

    return ([
        _proof.pi_a[0],
        _proof.pi_a[1],
        _proof.pi_b[0][1],
        _proof.pi_b[0][0],
        _proof.pi_b[1][1],
        _proof.pi_b[1][0],
        _proof.pi_c[0],
        _proof.pi_c[1],
    ]).map((x) => x.toString())
}

export {
    executeCircuit,
    formatProofForVerifierContract,
    getSignalByName,
    getSignalByNameViaSym,
    genVerifyEpochKeyProofAndPublicSignals,
    genVerifyReputationProofAndPublicSignals,
    genVerifyReputationFromAttesterProofAndPublicSignals,
    genVerifyUserStateTransitionProofAndPublicSignals,
    verifyEPKProof,
    verifyProveReputationProof,
    verifyProveReputationFromAttesterProof,
    verifyUserStateTransitionProof,
    genProofAndPublicSignals,
    verifyProof,
}