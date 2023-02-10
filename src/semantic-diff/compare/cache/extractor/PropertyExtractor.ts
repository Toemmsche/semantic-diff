import CachingExtractor from './CachingExtractor';
import TNode from '../../../tree/TNode';
import { Nullable } from '../../../Types';

export default class PropertyExtractor<T> extends CachingExtractor<
  Map<string, Nullable<string>>,
  T
> {
  protected computeValue(node: TNode<T>): void {
    if (node.isPropertyNode()) return; // do not set value
    const grammarNode = node.grammarNode!!;
    const propertyMap = new Map<string, Nullable<string>>();
    for (const wcv of grammarNode.weightedCVs) {
      propertyMap.set(wcv.path, this.accessProperty(node, wcv.path));
    }
    this.valueMap.set(node, propertyMap);
  }

  private accessProperty(node: TNode<T>, path: string) {
    // We assume that descending according to the path is always unambiguous
    // TODO performance improvements
    const pathNodes = path.split('/');
    let curr: Nullable<TNode<T>> = node;
    for (const pathNode of pathNodes) {
      // Termination conditions
      if (pathNode === '#text' || pathNode === '') {
        return curr.text;
      }
      if (pathNode.startsWith('@_')) {
        const attributeName = pathNode.replace('@_', '');
        return curr.attributes.get(attributeName);
      }
      curr = curr.children.find((child) => child.label === pathNode);
      if (!curr) {
        return null;
      }
    }

    // return text by default
    return curr.text;
  }
}
