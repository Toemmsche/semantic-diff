import Grammar from '../grammar/Grammar.js';
import XmlSerDes from './XmlSerDes.js';
import UnimplementedError from '../error/UnimplementedError.js';
import xmldom from '@xmldom/xmldom';
import GrammarNode from '../grammar/GrammarNode.js';
import IGrammarDeserializationOptions
  from './IGrammarDeserializationOptions.js';
import ComparisonType from '../grammar/ComparisonType.js';
import WeightedCV from '../grammar/WeightedCV.js';
import NodeType from '../grammar/NodeType.js';
import {getElementChildren, getTextContentWithoutChildren} from '../Util.js';
import MalformedGrammarError from '../error/MalformedGrammarError.js';

export default class GrammarXmlDomSerDes extends XmlSerDes<Grammar> {

  public constructor(private options: IGrammarDeserializationOptions) {
    super();
  }

  public override buildXmlString(obj: Grammar): string {
    throw new UnimplementedError();
  }


  public override parseXmlString(xml: string, includeChildren: boolean = true): Grammar {
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
          throw new MalformedGrammarError();
      }
    }
    return new Grammar(inners, leaves);
  }

  private parseGrammarNodes(xmlDom: Element, nodeType: NodeType): GrammarNode[] {
    const grammarNodes = [];

    for (const grammarNodeElement of getElementChildren(xmlDom)) {
      const weightedCvs = [];

      const ordered = grammarNodeElement.hasAttribute(this.options.GRAMMAR_NODE_ORDERED_KEY) ?
          grammarNodeElement.getAttribute(this.options.GRAMMAR_NODE_ORDERED_KEY) == "true" : undefined;

      for (const weightedCvElement of getElementChildren(grammarNodeElement)) {
        // TODO make default weight explicit

        let weight;
        if (weightedCvElement.hasAttribute(this.options.GRAMMAR_NODE_WEIGHT_KEY)
            && weightedCvElement.getAttribute(this.options.GRAMMAR_NODE_WEIGHT_KEY) != null) {
          let parsed = parseFloat(weightedCvElement.getAttribute(this.options.GRAMMAR_NODE_WEIGHT_KEY)!!);
          weight = isNaN(parsed) ? undefined : parsed;
        }

        const comparisonType = ComparisonType[(weightedCvElement.getAttribute(
            this.options.GRAMMAR_NODE_WEIGHT_KEY) ?? 'ALL_OR_NOTHING') as keyof typeof ComparisonType];
        const path = getTextContentWithoutChildren(weightedCvElement) ?? '';
        weightedCvs.push(new WeightedCV(path, weight, comparisonType));
      }
      grammarNodes.push(new GrammarNode(
          nodeType,
          grammarNodeElement.localName,
          weightedCvs,
          ordered
      ));
    }
    return grammarNodes;
  }

}