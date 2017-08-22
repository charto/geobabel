import { WKTOptions, GeometryKind, registerType, writeChildListWKT } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { Point } from './Point';

export class MultiPoint extends GeometryCollection {

	constructor(childList: Point[] | number[] = []) {
		super();
		const count = childList.length;

		if(count && childList[0] instanceof Point) {
			this.childList = childList as Point[];
		} else {
			this.childList = [];
			for(let num = 0; num < count; num += 2) {
				this.addChild(new Point(
					childList[num] as number,
					childList[num + 1] as number
				));
			}
		}
	}

	addChild(child: Point) { this.childList.push(child); }

	writeWKT(options: WKTOptions) {
		return(writeChildListWKT(this.childList, options));
	}

	childList: Point[];

}

registerType(MultiPoint, GeometryKind.multiPoint);
