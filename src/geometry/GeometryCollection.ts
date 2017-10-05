import { readU32 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';

export class GeometryCollection<Member extends Geometry = Geometry> extends Geometry {

	constructor(public childList: (Member | null | undefined)[] = []) { super(); }

	measureWKB() {
		let size = 9;

		for(let child of this.childList) {
			if(child) size += child.measureWKB();
		}

		return(size);
	}

	writeWKB(state: WKBState, pos: number, contentOnly?: boolean) {
		let count = 0;

		for(let child of this.childList) {
			if(child) ++count;
		}

		pos = super.writeWKB(state, pos, false, count);

		for(let child of this.childList) {
			if(child) pos = child.writeWKB(state, pos, contentOnly);
		}

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		const result = [];

		for(let child of this.childList) {
			if(child) {
				if(child.kind == this.defaultKind) {
					result.push('(' + child.writeWKT(options) + ')');
				} else {
					result.push(child.toWKT(options));
				}
			}
		}

		return(result.join(','));
	}

	readWKB(state: WKBState) {
		const count = readU32(state);

		for(let num = 0; num < count; ++num) {
			this.addChild(Geometry.readWKB(state) as Member);
		}

		return(this);
	}

	addChild(child: Member) { this.childList.push(child); }

}

registerType(GeometryCollection, GeometryKind.geometryCollection);
