import { writeU32, writeF64 } from '../Binary';
import { WKBOptions, WKTOptions, TagWKB, TagWKT, writePosListWKT } from '../WKX';
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

	writeWKB(options: WKBOptions, data: Uint8Array, pos: number) {
		let count = 0;

		for(let ring of this.ringList) {
			if(ring) ++count;
		}

		pos = super.writeWKB(options, data, pos, count);

		for(let ring of this.ringList) {
			if(ring) {
				pos = writeU32(options, data, pos, ring.length >> 1);

				for(let coord of ring) {
					pos = writeF64(options, data, pos, coord);
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

Polygon.prototype.tagWKB = TagWKB.polygon;
Polygon.prototype.tagWKT = TagWKT.polygon;
