import { writeF64 } from '../Binary';
import { WKBOptions, WKTOptions, TagWKB, TagWKT } from '../WKX';
import { Geometry } from './Geometry';

export class Point extends Geometry {

	constructor(x = 0, y = 0) {
		super();
		this.pos = [ x, y ];
	}

	measureWKB() {
		return(21);
	}

	writeWKB(options: WKBOptions, data: Uint8Array, pos: number) {
		pos = super.writeWKB(options, data, pos);

		pos = writeF64(options, data, pos, this.pos[0]);
		pos = writeF64(options, data, pos, this.pos[1]);

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		return(this.pos[0] + ' ' + this.pos[1]);
	}

	pos: number[];

}

Point.prototype.tagWKB = TagWKB.point;
Point.prototype.tagWKT = TagWKT.point;
