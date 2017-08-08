import { Endian, writeU32, writeF64 } from '../Binary';
import { WKBOptions, wkbDefaults, WKTOptions, wktDefaults, TagWKB, TagWKT } from '../WKX';

export abstract class Geometry {
	abstract measureWKB(): number;
	abstract writeWKT(options: WKTOptions): string;

	writeWKB(options: WKBOptions, data: Uint8Array, pos: number, count?: number) {
		data[pos++] = options.endian;

		pos = writeU32(options, data, pos, this.tagWKB);

		if(count || count === 0) pos = writeU32(options, data, pos, count);

		return(pos);
	}

	toWKB(options = wkbDefaults) {
		const data = new Uint8Array(this.measureWKB());

		this.writeWKB(options, data, 0);

		return(data);
	}

	toWKT(options = wktDefaults) {
		return(
			this.tagWKT.toUpperCase() +
			'(' + this.writeWKT(options) + ')'
		);
	}

	tagWKB: TagWKB;
	tagWKT: TagWKT;
}

Geometry.prototype.tagWKB = TagWKB.geometry;
Geometry.prototype.tagWKT = TagWKT.geometry;
