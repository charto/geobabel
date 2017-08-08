import { TagWKB, TagWKT } from '../WKX';
import { Geometry } from './Geometry';

export abstract class Curve extends Geometry {}

Curve.prototype.tagWKB = TagWKB.curve;
Curve.prototype.tagWKT = TagWKT.curve;
