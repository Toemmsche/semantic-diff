import Node from "./src/tree/Node.js";
const tree = new Node("description", [
    new Node("parallel", [
        new Node("manipuluate", [], "total += result.value['cost']"),
        new Node("call", [new Node("parameters", [new Node("method", [], "POST")])], "", new Map([["endpoint", "http://example.org"]]))
    ])
]);
const xml = "<description><parallel mode=\"first\"><call endpoint=\"http://example.org\" id=\"a2\"><parameters><method>POST</method></parameters></call></parallel></ddescription>";
const root = tree.fromXmlString(xml);
console.log(root.toJson());
console.dir(tree);
console.log("passing main...");