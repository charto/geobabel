import { writeF64 } from '../Binary';
import { WKBOptions, WKTOptions, TagWKB, TagWKT, writePosListWKT } from '../WKX';
import { Curve } from './Curve';

export class LineString extends Curve {

	constructor(public posList: number[] = []) { super(); }

	measureWKB() {
		return(9 + this.posList.length * 8);
	}

	writeWKB(options: WKBOptions, data: Uint8Array, pos: number) {
		pos = super.writeWKB(options, data, pos, this.posList.length >> 1);

		for(let coord of this.posList) {
			pos = writeF64(options, data, pos, coord);
		}

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		return(writePosListWKT(options, this.posList));
	}

}

LineString.prototype.tagWKB = TagWKB.lineString;
LineString.prototype.tagWKT = TagWKT.lineString;
