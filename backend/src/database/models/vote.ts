import { hash5 } from 'maci-crypto'

interface IAttestation {
    attesterId: BigInt;
    posRep: BigInt;
    negRep: BigInt;
    graffiti: BigInt;
    overwriteGraffiti: boolean;
}

class Attestation implements IAttestation {
    public attesterId: BigInt
    public posRep: BigInt
    public negRep: BigInt
    public graffiti: BigInt
    public overwriteGraffiti: boolean

    constructor(
        _attesterId: BigInt,
        _posRep: BigInt,
        _negRep: BigInt,
        _graffiti: BigInt,
        _overwriteGraffiti: boolean,
    ) {
        this.attesterId = _attesterId
        this.posRep = _posRep
        this.negRep = _negRep
        this.graffiti = _graffiti
        this.overwriteGraffiti = _overwriteGraffiti
    }

    public hash = (): BigInt => {
        return hash5([
            this.attesterId,
            this.posRep,
            this.negRep,
            this.graffiti,
            BigInt(this.overwriteGraffiti),
        ])
    }

    public toJSON = (space = 0): string => {
        return JSON.stringify(
            {
                attesterId: this.attesterId.toString(),
                posRep: this.posRep.toString(),
                negRep: this.negRep.toString(),
                graffiti: this.graffiti.toString(),
                overwriteGraffiti: this.overwriteGraffiti
            },
            null,
            space
        )
    }
}

export { Attestation }