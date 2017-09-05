import { readU32, writeU32, readF64, writeF64 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType } from '../WKX';
import { GeometryCollection } from './GeometryCollection';
import { Curve } from './Curve';
import { MultiCurve } from './MultiCurve';
import { StringSpec } from './LineString';

export class CompoundCurve extends Curve implements GeometryCollection<Curve> {

	constructor(childList: ( Curve | StringSpec )[] = []) {
		super();

		return(MultiCurve.prototype.init.call(this, childList));
	}

	measureWKB() {
		return(MultiCurve.prototype.measureWKB.call(this));
	}

	writeWKB(state: WKBState, pos: number, contentOnly?: boolean) {
		return(MultiCurve.prototype.writeWKB.call(this, state, pos, contentOnly));
	}

	writeWKT(options: WKTOptions) {
		return(MultiCurve.prototype.writeWKT.call(this, options));
	}

	readWKB(state: WKBState) {
		return(MultiCurve.prototype.readWKB.call(this, state));
	}

	addChild(child: Curve) { this.childList.push(child); }

	childList: Curve[] = [];

}

CompoundCurve.prototype.defaultKind = GeometryKind.lineString;

registerType(CompoundCurve, GeometryKind.compoundCurve);
