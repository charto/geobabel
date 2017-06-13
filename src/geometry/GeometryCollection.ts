import { Geometry, GeometryKind } from './Geometry';
import { BinaryType as T } from '../WKB';

export class GeometryCollection extends Geometry {

	toWKB(typeList: number[][], dataList: number[][]) {
		typeList.push([2, T.int32]);
		dataList.push([7, this.memberList.length]);

		let size = 8;
		for(let member of this.memberList) {
			size += member.toWKB(typeList, dataList);
		}

		return(size);
	}

	memberList: Geometry[];

}

GeometryCollection.prototype.kind = GeometryKind.geometryCollection;
