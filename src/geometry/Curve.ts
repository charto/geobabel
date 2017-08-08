import { GeometryKind } from '../WKX';
import { Geometry } from './Geometry';

export abstract class Curve extends Geometry {}

Curve.prototype.kind = GeometryKind.curve;
