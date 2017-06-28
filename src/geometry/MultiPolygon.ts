import { GeometryKind } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { MultiSurface } from './MultiSurface';
import { Polygon } from './Polygon';

export class MultiPolygon extends MultiSurface {

	addChild(child: Polygon) { this.childList.push(child); }

	childList: Polygon[] = [];

}

MultiPolygon.prototype.kind = GeometryKind.multiPolygon;
