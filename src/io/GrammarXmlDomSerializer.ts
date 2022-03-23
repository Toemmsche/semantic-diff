import Grammar from '../grammar/Grammar.js';
import XmlSerializable from './XmlSerializable.js';
import UnimplementedError from '../error/UnimplementedError.js';
import xmldom from '@xmldom/xmldom';
import GrammarNode from '../grammar/GrammarNode.js';
import ISerializationOptions from './ISerializationOptions.js';
import MalformedGrammarError from '../error/MalformedGrammarError.js';
import ComparisonType from '../grammar/ComparisonType.js';
import WeightedCV from '../grammar/WeightedCV.js';
import NodeType from '../grammar/NodeType.js';
import {getElementChildren, getTextContentWithoutChildren} from '../Util.js';

export default class GrammarXmlDomSerializer implements XmlSerializable<Grammar> {

  constructor(private options: ISerializationOptions) {
  }

  buildXmlString(obj: Grammar): string {
    throw new UnimplementedError();
  }

  private parseGrammarNodes(xmlDom: Element, nodeType: NodeType): GrammarNode[] {
    const grammarNodes = [];

    for (const grammarNodeElement of getElementChildren(xmlDom)) {
      const weightedCvs = [];
      for (const weightedCvElement of getElementChildren(grammarNodeElement)) {
        let weight = parseFloat(weightedCvElement.getAttribute(this.options.GRAMMAR_NODE_WEIGHT_KEY) ?? '1') ;
        weight = isNaN(weight) ? 1 : weight;
        const comparisonType = ComparisonType[(weightedCvElement.getAttribute(
            this.options.GRAMMAR_NODE_WEIGHT_KEY)!! ?? 'ALL_OR_NOTHING') as keyof typeof ComparisonType];
        const path = getTextContentWithoutChildren(weightedCvElement) ?? '';
        weightedCvs.push(new WeightedCV(path, weight, comparisonType));
      }
      grammarNodes.push(new GrammarNode(
          nodeType,
          grammarNodeElement.localName,
          weightedCvs
      ));
    }
    return grammarNodes;
  }

  parseXmlString(xml: string, includeChildren: boolean = true): Grammar {
    const root: Element = new xmldom.DOMParser().parseFromString(xml).childNodes
        .item(0) as Element;
    let inners: GrammarNode[] = [];
    let leaves: GrammarNode[] = [];
    for (const element of getElementChildren(root)) {
      switch (element.localName) {
        case this.options.GRAMMAR_INNERS_TAG:
          inners = this.parseGrammarNodes(element, NodeType.INNER);
          break;
        case this.options.GRAMMAR_LEAVES_TAG:
          leaves = this.parseGrammarNodes(element, NodeType.LEAF);
          break;
        default:
          throw new Error(); // TODO
      }
    }
    return new Grammar(inners!!, leaves!!);
  }

}