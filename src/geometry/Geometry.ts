import { Endian, readU32, writeU32, writeF64 } from '../Binary';
import {
	WKBOptions,
	WKBState,
	wkbDefaults,
	WKTOptions,
	wktDefaults,
	cloneOptions,
	GeometryKind,
	typeList
} from '../WKX';

export abstract class Geometry {
	abstract measureWKB(): number;
	abstract writeWKT(options: WKTOptions): string;

	writeWKB(state: WKBState, pos: number, count?: number) {
		const data = state.data;

		data[pos++] = state.endian;

		pos = writeU32(state, pos, this.kind);

		if(count || count === 0) pos = writeU32(state, pos, count);

		return(pos);
	}

	toWKB(options = wkbDefaults) {
		const state = cloneOptions(options, wkbDefaults) as WKBState;

		if(!state.data) state.data = new Uint8Array(this.measureWKB());

		this.writeWKB(state, state.pos);

		return(state.data);
	}

	toWKT(options = wktDefaults) {
		return(
			GeometryKind[this.kind].toUpperCase() +
			'(' + this.writeWKT(options) + ')'
		);
	}

	kind: GeometryKind;
}

Geometry.prototype.kind = GeometryKind.geometry;
