import * as geo from '../dist/index';

const point = new geo.Point(12, 34);
const line = new geo.LineString([ 12, 34, 56, 78]);
const ring1 = [ 12, 34, 56, 78, 90, 90, 12, 34 ];
const ring2 = [ 87, 65, 43, 21, 0, 0, 87, 65 ];
const polygon = new geo.Polygon([ ring1, ring2 ]);

const set = new geo.GeometryCollection([ point, line, polygon ]);

set.addChild(new geo.MultiPoint([ 12, 34, 56, 78 ]));
set.addChild(new geo.MultiLineString([ [ 12, 34, 56, 78 ], [ 87, 65, 43, 21 ] ]));
set.addChild(new geo.MultiPolygon([ polygon ]));
set.addChild(new geo.MultiCurve([ line ]));
set.addChild(new geo.MultiSurface([ polygon ]));

function dump(data: Uint8Array) {
	console.log(
		"SELECT ST_AsText(ST_GeomFromWKB('\\x" +
		Buffer.from(data).toString('hex') +
		"'));"
	);
}

const big = set.toWKB({ endian: geo.Endian.big });
const little = set.toWKB({ endian: geo.Endian.little });
const wkt = set.toWKT();

dump(big);
dump(little);
console.log("SELECT ST_AsText(ST_GeomFromText('" + wkt + "'));");

if(geo.Geometry.fromWKB(big).toWKT() != wkt || geo.Geometry.fromWKB(little).toWKT() != wkt) {
	console.error('WKT output mismatch');
	process.exit(1);
}
