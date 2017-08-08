import * as geo from '../dist/index';

const point = new geo.Point(12, 34);
const line = new geo.LineString([ 12, 34, 56, 78]);
const ring1 = [ 12, 34, 56, 78, 90, 90, 12, 34 ];
const ring2 = [ 87, 65, 43, 21, 0, 0, 87, 65 ];
const polygon = new geo.Polygon([ ring1, ring2 ]);

const c = new geo.GeometryCollection([ point, line, polygon ]);

c.addChild(new geo.MultiPoint([ 12, 34, 56, 78 ]));
c.addChild(new geo.MultiLineString([ [ 12, 34, 56, 78 ], [ 87, 65, 43, 21 ] ]));
c.addChild(new geo.MultiPolygon([ polygon ]));
c.addChild(new geo.MultiCurve([ line ]));
c.addChild(new geo.MultiSurface([ polygon ]));

function dump(geometry: geo.Geometry, endian: geo.Endian) {
	console.log(
		"SELECT ST_AsText(ST_GeomFromWKB('\\x" +

		Buffer.from(
			geometry.toWKB({ endian })
		).toString('hex') +

		"'));"
	);
}

dump(c, geo.Endian.big);
dump(c, geo.Endian.little);
console.log("SELECT ST_AsText(ST_GeomFromText('" + c.toWKT() + "'));");
