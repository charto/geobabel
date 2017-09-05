import { readU32 } from '../Binary';
import { WKBState, WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection } from './GeometryCollection';
import { Curve } from './Curve';
import { MultiCurve } from './MultiCurve';
import { LineString, StringSpec } from './LineString';

export interface GenericPolygon<MemberType extends Curve> extends GeometryCollection<MemberType> {}

export function definePolygonClass<SpecType, MemberType extends Curve>(
	Member: { new(spec?: SpecType): MemberType }
): { new(spec?: ( MemberType | SpecType | null | undefined )[]): GenericPolygon<MemberType> } {

	type RingSpec = MemberType | SpecType | null | undefined;

	class GenericPolygon extends Geometry implements GeometryCollection<MemberType> {

		constructor(ringList: RingSpec[] = []) {
			super();
			const count = ringList.length;

			for(let num = 0; num < count; ++num) {
				const ring = ringList[num];

				if(ring instanceof Member) {
					this.childList[num] = ring;
				} else if(ring) {
					this.childList[num] = new Member(ring);
				}
			}
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

		addChild(child: MemberType) { this.childList.push(child); }

		childList: ( MemberType | null | undefined )[] = [];

	}

	GenericPolygon.prototype.defaultKind = GeometryKind.lineString;

	return(GenericPolygon);
}

export type PolygonRingSpec = LineString | StringSpec | null | undefined;

export class Polygon extends definePolygonClass(LineString) {

	measureWKB() {
		let size = 9;

		for(let child of this.childList) {
			if(child) size += child.measureWKB() - 5;
		}

		return(size);
	}

	writeWKB(state: WKBState, pos: number) {
		return(super.writeWKB(state, pos, true));
	}

	readWKB(state: WKBState) {
		const count = readU32(state);

		for(let num = 0; num < count; ++num) {
			this.addChild(new LineString().readWKB(state));
		}

		return(this);
	}

}

registerType(Polygon, GeometryKind.polygon);
