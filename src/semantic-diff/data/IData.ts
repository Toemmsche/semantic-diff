import TNode from '../tree/TNode';
import { Nullable } from '../Types';
import Equatable from './Equatable';

export default interface IData extends Equatable {
  // comparable to key in a map
  get label(): string;

  // comparable to value in a map
  get text(): Nullable<string>;

  set text(text: Nullable<string>);

  // more detailed properties
  get attributes(): Map<string, string>;
}
