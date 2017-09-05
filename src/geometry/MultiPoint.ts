import { WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { Point } from './Point';

export class MultiPoint extends GeometryCollection<Point> {

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

	writeWKT(options: WKTOptions) {
		return(this.childList.map(
				(child: Point) => child.writeWKT(options)
		).join(','));
	}

}

registerType(MultiPoint, GeometryKind.multiPoint);
