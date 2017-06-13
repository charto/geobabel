import { Geometry, GeometryKind } from './Geometry';
import { BinaryType as T } from '../WKB';

export class Point extends Geometry {

	toWKB(typeList: number[][], dataList: number[][]) {
		typeList.push([1, T.int32, 2, T.double]);
		dataList.push([this.kind, this.pos[0], this.pos[1]]);
		return(20);
	}

	pos: number[];

}

Point.prototype.kind = GeometryKind.point;
