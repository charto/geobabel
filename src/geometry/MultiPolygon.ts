import { WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { MultiSurface } from './MultiSurface';
import { Polygon, GenericPolygon, PolygonRingSpec } from './Polygon';

export class MultiPolygon extends MultiSurface<Polygon> {

	constructor(childList: ( Polygon | PolygonRingSpec[] )[] = []) {
		super();

		for(let child of childList) {
			if(child instanceof Polygon) {
				this.childList.push(child);
			} else {
				this.childList.push(new Polygon(child));
			}
		}
	}

}

registerType(MultiPolygon, GeometryKind.multiPolygon);
