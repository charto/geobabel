import { readU32, writeU32, readF64, writeF64 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType } from '../WKX';
import { Curve } from './Curve';

export type StringSpec = number[];

export class GenericString extends Curve {

	constructor(public posList: StringSpec = []) { super(); }

	measureWKB() {
		return(9 + this.posList.length * 8);
	}

	writeWKB(state: WKBState, pos: number, contentOnly?: boolean) {
		pos = super.writeWKB(state, pos, contentOnly, this.posList.length >> 1);

		for(let coord of this.posList) {
			pos = writeF64(state, pos, coord);
		}

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		const content: string[] = [];
		const posList = this.posList;
		const count = posList.length;

		for(let num = 0; num < count; num += 2) {
			content.push(posList[num] + ' ' + posList[num + 1]);
		}

		return(content.join(','));
	}

	readWKB(state: WKBState) {
		const count = readU32(state) * 2;

		for(let num = 0; num < count; ++num) {
			this.posList[num] = readF64(state);
		}

		return(this);
	}

}

export class LineString extends GenericString {}

registerType(LineString, GeometryKind.lineString);
