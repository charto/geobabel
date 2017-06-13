import { Geometry, GeometryKind } from './Geometry';
import { BinaryType as T } from '../WKB';

export class LineString extends Geometry {

	toWKB(typeList: number[][], dataList: number[][]) {
		const count = this.posList.length >> 1;
		typeList.push([2, T.int32, count * 2, T.double]);
		dataList.push([this.kind, count], this.posList);
		return(8 + count * 16);
	}

	posList: number[];

}

LineString.prototype.kind = GeometryKind.lineString;

