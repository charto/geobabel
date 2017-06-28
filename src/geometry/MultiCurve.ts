import { GeometryKind } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { Curve } from './Curve';

export class MultiCurve extends GeometryCollection {

	addChild(child: Curve) { this.childList.push(child); }

	childList: Curve[] = [];

}

MultiCurve.prototype.kind = GeometryKind.multiCurve;
