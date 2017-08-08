import { GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection } from './GeometryCollection';
import { Curve } from './Curve';

export class MultiCurve extends GeometryCollection {

	constructor(public childList: Curve[] = []) { super(); }

	addChild(child: Curve) { this.childList.push(child); }

}

registerType(MultiCurve, GeometryKind.multiCurve);
