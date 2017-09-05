import { GeometryKind, registerType } from '../WKX';
import { Curve } from './Curve';
import { StringSpec } from './LineString';
import { CompoundCurve } from './CompoundCurve';
import { GenericPolygon, definePolygonClass } from './Polygon';

export type CurvePolygonRingSpec = CompoundCurve | StringSpec | null | undefined;
export type CurvePolygon = GenericPolygon<CompoundCurve>;
export const CurvePolygon = definePolygonClass(CompoundCurve);

registerType(CurvePolygon, GeometryKind.curvePolygon);
