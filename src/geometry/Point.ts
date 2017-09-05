import { readF64, writeF64 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';

export class Point extends Geometry {

	constructor(x = 0, y = 0) {
		super();
		this.pos = [ x, y ];
	}

	measureWKB() {
		return(21);
	}

	writeWKB(state: WKBState, pos: number, contentOnly?: boolean) {
		pos = super.writeWKB(state, pos, contentOnly);

		pos = writeF64(state, pos, this.pos[0]);
		pos = writeF64(state, pos, this.pos[1]);

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		return(this.pos[0] + ' ' + this.pos[1]);
	}

	readWKB(state: WKBState) {
		this.pos[0] = readF64(state);
		this.pos[1] = readF64(state);

		return(this);
	}

	pos: number[];

}

registerType(Point, GeometryKind.point);
