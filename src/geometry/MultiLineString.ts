import { WKTOptions, GeometryKind, registerType } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { MultiCurve } from './MultiCurve';
import { LineString } from './LineString';

export class MultiLineString extends MultiCurve<LineString> {}

registerType(MultiLineString, GeometryKind.multiLineString);
