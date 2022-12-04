import IGrammarDeserializationOptions from './IGrammarDeserializationOptions';
import ISerializationOptions from './ISerializationOptions';
import IJsonDeserializationOptions from "./IJsonDeserializationOptions";

export default interface ISerDesOptions extends IGrammarDeserializationOptions,
    ISerializationOptions,
    IJsonDeserializationOptions {

}