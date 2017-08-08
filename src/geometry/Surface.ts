import { TagWKB, TagWKT } from '../WKX';
import { Geometry } from './Geometry';

export abstract class Surface extends Geometry {}

Surface.prototype.tagWKB = TagWKB.surface;
Surface.prototype.tagWKT = TagWKT.surface;
