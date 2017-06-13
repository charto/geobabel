export const enum GeometryKind {
	point = 0,
	lineString,
	polygon,
	geometryCollection
}

export abstract class Geometry {
	abstract toWKB(typeList: number[][], dataList: number[][]): number;

	kind: GeometryKind;
}
