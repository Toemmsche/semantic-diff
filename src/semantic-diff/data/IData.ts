import TNode from "../tree/TNode";
import {Nullable} from "../Types";

export default interface IData {

    // comparable to key in a map
    get label(): string;

    // comparable to value in a map
    get text(): Nullable<string>;

    set text(text: Nullable<string>);

    // more detailed properties
    get attributes(): Map<string, string>;
}