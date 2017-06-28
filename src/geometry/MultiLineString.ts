import { GeometryKind } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { MultiCurve } from './MultiCurve';
import { LineString } from './LineString';

export class MultiLineString extends MultiCurve {

	addChild(child: LineString) { this.childList.push(child); }

	childList: LineString[] = [];

}

MultiLineString.prototype.kind = GeometryKind.multiLineString;
