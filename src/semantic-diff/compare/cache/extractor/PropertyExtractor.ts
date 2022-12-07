import CachingExtractor from './CachingExtractor';
import TNode from '../../../tree/TNode';
import {Nullable} from "../../../Types";

export default class PropertyExtractor<T> extends CachingExtractor<Map<string, Nullable<string>>, T> {

  protected computeValue(node: TNode<T>): void {
    if (node.isPropertyNode()) return; // do not set value
    const grammarNode = node.grammarNode!!;
    const propertyMap = new Map<string, Nullable<string>>();
    for (const wcv of grammarNode.weightedCVs) {
      propertyMap.set(wcv.path, node.accessProperty(wcv.path));
    }
    this.valueMap.set(node, propertyMap);
  }

}