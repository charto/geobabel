import { GeometryKind, registerType } from '../WKX';
import { GeometryCollection} from './GeometryCollection';
import { Surface } from './Surface';

export class MultiSurface<Member extends Surface = Surface> extends GeometryCollection<Member> {}

MultiSurface.prototype.defaultKind = GeometryKind.polygon;

registerType(MultiSurface, GeometryKind.multiSurface);
