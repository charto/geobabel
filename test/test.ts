import * as geo from '../dist/index';

const pts2 = [ 12, 34, 56, 78];

const point = new geo.Point(12, 34);
const line = new geo.LineString(pts2);
const circle = new geo.CircularString([ 56, 78, 90, 90, 12, 34]);
const ring1 = [ 12, 34, 56, 78, 90, 90, 12, 34 ];
const ring2 = [ 87, 65, 43, 21, 0, 0, 87, 65 ];
const polygon = new geo.Polygon([ ring1, ring2 ]);
const compound = new geo.CompoundCurve([ line, circle ]);
const curvePolygon = new geo.CurvePolygon([ compound ]);

const set = new geo.GeometryCollection([ point, line, polygon ] as geo.Geometry[]);

set.addChild(new geo.MultiPoint(pts2));
set.addChild(new geo.MultiLineString([ pts2, [ 87, 65, 43, 21 ] ]));
set.addChild(new geo.MultiPolygon([ polygon ]));
set.addChild(new geo.MultiCurve([ line, compound ]));
set.addChild(new geo.MultiSurface([ polygon, curvePolygon ]));

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
