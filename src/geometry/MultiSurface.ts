import { TagWKB, TagWKT } from '../WKX';
import { Geometry } from './Geometry';
import { GeometryCollection} from './GeometryCollection';
import { Surface } from './Surface';

export class MultiSurface extends GeometryCollection {

	constructor(public childList: Surface[] = []) { super(); }

	addChild(child: Surface) { this.childList.push(child); }

}

MultiSurface.prototype.tagWKB = TagWKB.multiSurface;
MultiSurface.prototype.tagWKT = TagWKT.multiSurface;
