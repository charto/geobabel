import { WKBState, WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';

export class GeometryCollection extends Geometry {

	constructor(public childList: Geometry[] = []) { super(); }

	measureWKB() {
		let size = 9;

		for(let member of this.childList) {
			size += member.measureWKB();
		}

		return(size);
	}

	writeWKB(state: WKBState, pos: number) {
		pos = super.writeWKB(state, pos, this.childList.length);

		for(let member of this.childList) {
			pos = member.writeWKB(state, pos);
		}

		return(pos);
	}

	writeWKT(options: WKTOptions) {
		return(
			this.childList.map(
				(member: Geometry) => member.toWKT(options)
			).join(',')
		);
	}

	addChild(child: Geometry) { this.childList.push(child); }

}

registerType(GeometryCollection, GeometryKind.geometryCollection);
