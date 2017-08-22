import { readU32, readF64, writeF64 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType, writePosListWKT } from '../WKX';
import { Curve } from './Curve';

export class LineString extends Curve {

	constructor(public posList: number[] = []) { super(); }

	measureWKB() {
		return(9 + this.posList.length * 8);
	}

	writeWKB(state: WKBState, pos: number) {
		pos = super.writeWKB(state, pos, this.posList.length >> 1);

		for(let coord of this.posList) {
			pos = writeF64(state, pos, coord);
		}

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		return(writePosListWKT(this.posList, options));
	}

	readWKB(state: WKBState) {
		const count = readU32(state) * 2;

		for(let num = 0; num < count; ++num) {
			this.posList[num] = readF64(state);
		}

		return(this);
	}

}

registerType(LineString, GeometryKind.lineString);
