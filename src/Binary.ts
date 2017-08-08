export const enum Endian {
	big = 0,
	little = 1
}

export interface BinaryOptions {
	endian: Endian;
}

const tempF64 = new Float64Array(1);
const bufF64 = new Uint8Array(tempF64.buffer);

const tempDummy = new Uint32Array(1);
const bufDummy = new Uint8Array(tempDummy.buffer);
let nativeEndian: Endian;

writeU32({ endian: Endian.little }, bufDummy, 0, 0x01020304);

if(tempDummy[0] == 0x01020304) {
	nativeEndian = Endian.little;
} else if(tempDummy[0] == 0x04030201) {
	nativeEndian = Endian.big;
} else {
	throw(new Error('Middle endian is not supported'));
}

export function writeU32(options: BinaryOptions, data: Uint8Array, pos: number, num: number) {
	if(options.endian == Endian.little) {
		data[pos++] = num;
		data[pos++] = num >> 8;
		data[pos++] = num >> 16;
		data[pos++] = num >> 24;
	} else {
		data[pos++] = num >> 24;
		data[pos++] = num >> 16;
		data[pos++] = num >> 8;
		data[pos++] = num;
	}

	return(pos);
}

export function writeF64(options: BinaryOptions, data: Uint8Array, pos: number, num: number) {
	tempF64[0] = num;

	if(options.endian == nativeEndian) {
		data.set(bufF64, pos);
		return(pos + 8);
	} else {
		data[pos++] = bufF64[7];
		data[pos++] = bufF64[6];
		data[pos++] = bufF64[5];
		data[pos++] = bufF64[4];
		data[pos++] = bufF64[3];
		data[pos++] = bufF64[2];
		data[pos++] = bufF64[1];
		data[pos++] = bufF64[0];
		return(pos);
	}
}
