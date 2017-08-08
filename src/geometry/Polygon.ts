import { writeU32, writeF64 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType, writePosListWKT } from '../WKX';
import { Geometry } from './Geometry';

export class Polygon extends Geometry {

	constructor(public ringList: (number[] | null)[] = []) { super(); }

	measureWKB() {
		let size = 9;

		for(let ring of this.ringList) {
			if(ring) size += 4 + ring.length * 8;
		}

		return(size);
	}

	writeWKB(state: WKBState, pos: number) {
		let count = 0;

		for(let ring of this.ringList) {
			if(ring) ++count;
		}

		pos = super.writeWKB(state, pos, count);

		for(let ring of this.ringList) {
			if(ring) {
				pos = writeU32(state, pos, ring.length >> 1);

				for(let coord of ring) {
					pos = writeF64(state, pos, coord);
				}
			}
		}

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		const content: string[] = [];

		for(let ring of this.ringList) {
			if(ring) content.push('(' + writePosListWKT(options, ring) + ')');
		}

		return(content.join(','));
	}

}

registerType(Polygon, GeometryKind.polygon);
