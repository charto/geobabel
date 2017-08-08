import { WKBOptions, WKTOptions, TagWKB, TagWKT } from '../WKX';
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

	writeWKB(options: WKBOptions, data: Uint8Array, pos: number) {
		pos = super.writeWKB(options, data, pos, this.childList.length);

		for(let member of this.childList) {
			pos = member.writeWKB(options, data, pos);
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

GeometryCollection.prototype.tagWKB = TagWKB.geometryCollection;
GeometryCollection.prototype.tagWKT = TagWKT.geometryCollection;
