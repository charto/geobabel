export const enum GeometryKind {
	geometry = 0,
	point = 1,
	lineString = 2,
	polygon = 3,
	geometryCollection = 7
}

export abstract class Geometry {
	abstract toWKB(typeList: number[][], dataList: number[][]): number;

	kind: GeometryKind;
}
