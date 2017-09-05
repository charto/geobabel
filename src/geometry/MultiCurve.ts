import { GeometryKind, registerType } from '../WKX';
import { GeometryCollection } from './GeometryCollection';
import { LineString, StringSpec } from './LineString';
import { Curve } from './Curve';

export class MultiCurve<Member extends Curve = Curve> extends GeometryCollection<Member> {

	constructor(childList: ( Member | StringSpec )[] = []) {
		super();

		this.init(childList);
	}

	init(childList: ( Member | StringSpec)[]) {
		for(let child of childList) {
			if(child instanceof Curve) {
				this.childList.push(child as Member);
			} else {
				this.childList.push(new LineString(child) as Curve as Member);
			}
		}
	}

}

MultiCurve.prototype.defaultKind = GeometryKind.lineString;

registerType(MultiCurve, GeometryKind.multiCurve);
