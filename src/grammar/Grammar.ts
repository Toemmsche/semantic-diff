import GrammarNode from "./GrammarNode.js";
import {defaultParameters} from "./IParameters.js";

export default class Grammar {


    // Property nodes are inferred implicitly (everything that is NOT an inner
    // and NOT a leaf node)

    constructor(public inners: GrammarNode[], public leaves: GrammarNode[], public parameters: object = {}) {
        this.parameters = {...defaultParameters, ...parameters};
    }
}