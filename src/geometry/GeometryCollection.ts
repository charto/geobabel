import { Geometry, GeometryKind } from './Geometry';
import { BinaryType as T } from '../WKB';

export class GeometryCollection extends Geometry {

	toWKB(typeList: number[][], dataList: number[][]) {
		typeList.push([1, T.int8, 2, T.int32]);
		dataList.push([1, this.kind, this.memberList.length]);

		let size = 9;
		for(let member of this.memberList) {
			size += member.toWKB(typeList, dataList);
		}

		return(size);
	}

	memberList: Geometry[];

}

GeometryCollection.prototype.kind = GeometryKind.geometryCollection;
