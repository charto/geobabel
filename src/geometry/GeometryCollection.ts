import { Geometry, GeometryKind } from './Geometry';
import { BinaryType as T } from '../WKB';

export class GeometryCollection extends Geometry {

	toWKB(typeList: number[][], dataList: number[][]) {
		typeList.push([1, T.int8, 2, T.int32]);
		dataList.push([1, this.kind, this.childList.length]);

		let size = 9;
		for(let member of this.childList) {
			size += member.toWKB(typeList, dataList);
		}

		return(size);
	}

	addChild(child: Geometry) { this.childList.push(child); }

	childList: Geometry[] = [];

}

GeometryCollection.prototype.kind = GeometryKind.geometryCollection;
