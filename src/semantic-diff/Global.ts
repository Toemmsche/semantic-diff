import GrammarNode from './grammar/GrammarNode';
import NodeType from './grammar/NodeType';
import Grammar from './grammar/Grammar';
import WeightedCV from './grammar/WeightedCV';
import ComparisonType from './grammar/ComparisonType';

// cpee grammar for now
export const cpeeGrammar = new Grammar(
  [
    // inners
    new GrammarNode(NodeType.INNER, 'description', []),
    new GrammarNode(NodeType.INNER, 'parallel', [
      new WeightedCV('@_mode', 1),
      new WeightedCV('@_condition', 2)
    ]),
    new GrammarNode(NodeType.INNER, 'loop', [
      new WeightedCV('@_mode', 1),
      new WeightedCV('@_condition', 2)
    ]),
    new GrammarNode(NodeType.INNER, 'choose', [new WeightedCV('@_mode', 1)]),
    new GrammarNode(NodeType.INNER, 'alternative', [new WeightedCV('@_condition', 1)]),
    new GrammarNode(NodeType.INNER, 'otherwise', []),
    new GrammarNode(NodeType.INNER, 'parallel_branch', [])
  ],
  [
    // leaves
    new GrammarNode(NodeType.LEAF, 'call', [
      new WeightedCV('@_endpoint', 3),
      new WeightedCV('parameters/method', 2),
      new WeightedCV('code/finalize', 3)
    ]),
    new GrammarNode(NodeType.LEAF, 'manipulate', [new WeightedCV('', 1, ComparisonType.LCS)]),
    new GrammarNode(NodeType.LEAF, 'stop', []),
    new GrammarNode(NodeType.LEAF, 'terminate', []),
    new GrammarNode(NodeType.LEAF, 'escape', [])
  ],
  0
);

export const ChangeModel = {
  INSERTION: {
    label: 'insert',
    uri: 'http://cpee.org/ns/description/1.0/insert',
    prefix: 'ins'
  },
  DELETION: {
    label: 'delete',
    uri: 'http://cpee.org/ns/description/1.0/delete',
    prefix: 'del'
  },
  MOVE: {
    label: 'move',
    uri: 'http://cpee.org/ns/description/1.0/move',
    prefix: 'mov'
  },
  MOVE_FROM: {
    label: 'move_from',
    uri: 'http://cpee.org/ns/description/1.0/move-from',
    prefix: 'movfr'
  },
  UPDATE: {
    label: 'update',
    uri: 'http://cpee.org/ns/description/1.0/update',
    prefix: 'upd'
  },
  UPDATE_FROM: {
    label: 'udpate_from',
    uri: 'http://cpee.org/ns/description/1.0/update-from',
    prefix: 'updfr'
  },
  NIL: {
    label: 'nil',
    uri: 'http://cpee.org/ns/description/1.0/nil',
    prefix: 'nil'
  }
};
