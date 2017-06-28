export const enum GeometryKind {
	geometry = 0,
	point = 1,
	lineString = 2,
	polygon = 3,
	multiPoint = 4,
	multiLineString = 5,
	multiPolygon = 6,
	geometryCollection = 7,
	multiCurve = 11,
	multiSurface = 12,
	curve = 13,
	surface = 14
}

export abstract class Geometry {
	abstract toWKB(typeList: number[][], dataList: number[][]): number;

	kind: GeometryKind;
}

Geometry.prototype.kind = GeometryKind.geometry;
