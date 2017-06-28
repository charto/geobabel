import { GeometryKind } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { Surface } from './Surface';

export class MultiSurface extends GeometryCollection {

	addChild(child: Surface) { this.childList.push(child); }

	childList: Surface[] = [];

}

MultiSurface.prototype.kind = GeometryKind.multiSurface;
