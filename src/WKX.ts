import { BinaryOptions, BinaryState, Endian } from './Binary';
import { Geometry } from './geometry/Geometry';

export interface WKBOptions extends BinaryOptions {}

export interface WKBState extends WKBOptions, BinaryState {
	data: Uint8Array;
	pos: number;
}

export const wkbDefaults: WKBOptions = {
	endian: Endian.little,
	pos: 0
};

export interface WKTOptions {}

export const wktDefaults: WKTOptions = {};

export function cloneOptions<Options>(options: Options, defaults: Options) {
	const config: Options = {} as any;
	let optionSet: { [key: string]: any };

	for(optionSet of [ defaults, options ]) {
		for(let key of Object.keys(optionSet)) {
			if(optionSet[key] !== void 0) (config as any)[key] = optionSet[key];
		}
	}

	return(config);
}

export enum GeometryKind {
	geometry = 0,
	point = 1,
	lineString = 2,
	polygon = 3,
	multiPoint = 4,
	multiLineString = 5,
	multiPolygon = 6,
	geometryCollection = 7,
	circularString = 8,
	compoundCurve = 9,
	curvePolygon = 10,
	multiCurve = 11,
	multiSurface = 12,
	curve = 13,
	surface = 14
}

export const typeList: ({ new(): Geometry } | null)[] = [];

export function registerType(Type: { new(): Geometry }, kind: GeometryKind) {
	Type.prototype.kind = kind;
	typeList[kind] = Type;
}

export function importWKB(data: Uint8Array) {
	const tempDouble = new Float64Array(1);
	const bufDouble = new Uint8Array(tempDouble.buffer);
	const tempInt32 = new Int32Array(1);
	const bufInt32 = new Uint8Array(tempInt32.buffer);

	bufInt32.set(data);
}
