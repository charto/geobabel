import { BinaryOptions, Endian } from './Binary';
import { Geometry } from './geometry/Geometry';

export interface WKBOptions extends BinaryOptions {}

export const wkbDefaults: WKBOptions = {
	endian: Endian.little
};

export interface WKTOptions {}

export const wktDefaults: WKTOptions = {};

export enum TagWKB {
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

export enum TagWKT {
	geometry = 'Geometry',
	point = 'Point',
	lineString = 'LineString',
	polygon = 'Polygon',
	multiPoint = 'MultiPoint',
	multiLineString = 'MultiLineString',
	multiPolygon = 'MultiPolygon',
	geometryCollection = 'GeometryCollection',
	multiCurve = 'MultiCurve',
	multiSurface = 'MultiSurface',
	curve = 'Curve',
	surface = 'Surface'
}

export function writePosListWKT(options: WKTOptions, posList: number[]) {
	const content: string[] = [];
	const count = posList.length;

	for(let num = 0; num < count; num += 2) {
		content.push(posList[num] + ' ' + posList[num + 1]);
	}

	return(content.join(','));
}

export function writeChildListWKT<Member extends Geometry>(options: WKTOptions, childList: Member[], prefix = '', suffix = '') {
	return(
		childList.map(
			(member: Member) => prefix + member.writeWKT(options) + suffix
		).join(',')
	);
}

export function importWKB(data: Uint8Array) {
	const tempDouble = new Float64Array(1);
	const bufDouble = new Uint8Array(tempDouble.buffer);
	const tempInt32 = new Int32Array(1);
	const bufInt32 = new Uint8Array(tempInt32.buffer);

	bufInt32.set(data);
}
