import { writeF64 } from '../Binary';
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
		return(writePosListWKT(options, this.posList));
	}

}

registerType(LineString, GeometryKind.lineString);
