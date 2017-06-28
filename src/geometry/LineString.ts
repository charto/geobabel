import { GeometryKind } from './Geometry';
import { Curve } from './Curve';
import { BinaryType as T } from '../WKB';

export class LineString extends Curve {

	toWKB(typeList: number[][], dataList: number[][]) {
		const count = this.posList.length >> 1;
		typeList.push([1, T.int8, 2, T.int32, count * 2, T.double]);
		dataList.push([1, this.kind, count], this.posList);
		return(9 + count * 16);
	}

	posList: number[] = [];

}

LineString.prototype.kind = GeometryKind.lineString;

