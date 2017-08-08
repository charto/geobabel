import { WKTOptions, GeometryKind, registerType, writeChildListWKT } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { MultiCurve } from './MultiCurve';
import { LineString } from './LineString';

export class MultiLineString extends MultiCurve {

	constructor(childList: LineString[] | number[][] = []) {
		super();
		const count = childList.length;

		if(count && childList[0] instanceof LineString) {
			this.childList = childList as LineString[];
		} else {
			this.childList = (childList as number[][]).map(
				(posList: number[]) => new LineString(posList)
			);
		}
	}

	addChild(child: LineString) { this.childList.push(child); }

	writeWKT(options: WKTOptions) {
		return(writeChildListWKT(options, this.childList, '(', ')'));
	}

	childList: LineString[];

}

registerType(MultiLineString, GeometryKind.multiLineString);
