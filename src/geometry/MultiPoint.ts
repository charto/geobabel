import { GeometryKind } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { Point } from './Point';

export class MultiPoint extends GeometryCollection {

	addChild(child: Point) { this.childList.push(child); }

	childList: Point[] = [];

}

MultiPoint.prototype.kind = GeometryKind.multiPoint;
