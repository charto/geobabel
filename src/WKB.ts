import { Geometry } from './geometry/Geometry';

export const enum BinaryType {
	int32,
	double
}

export function encodeBinary(
	typeList: number[][],
	dataList: number[][],
	data: Uint8Array,
	pos = 0
) {
	const tempDouble = new Float64Array(1);
	const bufDouble = new Uint8Array(tempDouble.buffer);
	const tempInt32 = new Int32Array(1);
	const bufInt32 = new Uint8Array(tempInt32.buffer);

	let chunkNum = 0;
	let dataChunk = dataList[chunkNum];
	let dataLen = dataChunk.length;
	let dataPos = 0;

	for(let typeChunk of typeList) {
		const typeLen = typeChunk.length;

		for(let typePos = 0; typePos < typeLen; typePos += 2) {
			let len = typeChunk[typePos];
			const kind = typeChunk[typePos + 1];

			if(dataPos >= dataLen) {
				dataChunk = dataList[++chunkNum];
				dataLen = dataChunk.length;
				dataPos = 0;
			}

			switch(kind) {
				case BinaryType.double:

					while(len--) {
						tempDouble[0] = dataChunk[dataPos++];
						data.set(bufDouble, pos);
						pos += 8;
					}
					break;

				case BinaryType.int32:

					while(len--) {
						tempInt32[0] = dataChunk[dataPos++];
						data.set(bufInt32, pos);
						pos += 4;
					}
					break;
			}
		}
	}

	return(data);
}

export function exportWKB(geometry: Geometry) {
	const typeList: number[][] = [];
	const dataList: number[][] = [];

	const size = 1 + geometry.toWKB(typeList, dataList);
	const data = new Uint8Array(size);

	data[0] = 1; // Little endian.
	return(encodeBinary(typeList, dataList, data, 1));
}
