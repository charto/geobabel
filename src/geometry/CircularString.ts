import { GeometryKind, registerType } from '../WKX';
import { GenericString } from './LineString';

// TODO: Ensure number of points is divisible by 2 when exporting.
export class CircularString extends GenericString {}

registerType(CircularString, GeometryKind.circularString);
