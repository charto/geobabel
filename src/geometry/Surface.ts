import { GeometryKind } from '../WKX';
import { Geometry } from './Geometry';

export abstract class Surface extends Geometry {}

Surface.prototype.kind = GeometryKind.surface;
