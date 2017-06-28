import { Geometry, GeometryKind } from './Geometry';

export abstract class Curve extends Geometry {}

Curve.prototype.kind = GeometryKind.curve;
