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
	abstract readWKB(state: WKBState): this;

	writeWKB(state: WKBState, pos: number, contentOnly?: boolean, count?: number) {
		const data = state.data;

		if(!contentOnly) {
			data[pos++] = state.endian;
			pos = writeU32(state, pos, this.kind);
		}

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
			(this.kind == this.defaultKind ? '' : GeometryKind[this.kind].toUpperCase()) +
			'(' + this.writeWKT(options) + ')'
		);
	}

	static readWKB(state: WKBState) {
		state.endian = state.data[state.pos++];

		const tag = readU32(state);
		const Type = typeList[tag];

		if(!Type) throw(new Error('Unknown WKB geometry type ' + tag));

		return(new Type().readWKB(state));
	}

	static fromWKB(data: Uint8Array, options = wkbDefaults) {
		const state = cloneOptions(options, wkbDefaults) as WKBState;

		state.data = data;

		return(Geometry.readWKB(state));
	}

	kind: GeometryKind;
	defaultKind: GeometryKind;

}

Geometry.prototype.kind = GeometryKind.geometry;
