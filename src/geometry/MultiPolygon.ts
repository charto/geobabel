import { WKTOptions, GeometryKind, registerType, writeChildListWKT } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { MultiSurface } from './MultiSurface';
import { Polygon } from './Polygon';

export class MultiPolygon extends MultiSurface {

	constructor(childList: Polygon[] | number[][][] = []) {
		super();
		const count = childList.length;

		if(count && childList[0] instanceof Polygon) {
			this.childList = childList as Polygon[];
		} else {
			for(let ringList of childList) {
				this.addChild(new Polygon(ringList as number[][]));
			}
		}
	}

	addChild(child: Polygon) { this.childList.push(child); }

	writeWKT(options: WKTOptions) {
		return(writeChildListWKT(options, this.childList, '(', ')'));
	}

	childList: Polygon[] = [];

}

registerType(MultiPolygon, GeometryKind.multiPolygon);
