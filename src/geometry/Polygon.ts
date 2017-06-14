import { Geometry, GeometryKind } from './Geometry';
import { BinaryType as T } from '../WKB';

export class Polygon extends Geometry {

	toWKB(typeList: number[][], dataList: number[][]) {
		let ringCount = 0;
		let ptCount = 0;

		for(let ring of this.ringList) {
			if(ring) ++ringCount;
		}

		typeList.push([1, T.int8, 2, T.int32]);
		dataList.push([1, this.kind, ringCount]);

		for(let ring of this.ringList) {
			if(ring) {
				const count = ring.length >> 1;
				typeList.push([1, T.int32, count * 2, T.double]);
				dataList.push([count], ring);
				ptCount += count;
			}
		}

		return(9 + ringCount * 4 + ptCount * 16);
	}

	ringList: (number[] | null)[];

}

Polygon.prototype.kind = GeometryKind.polygon;
