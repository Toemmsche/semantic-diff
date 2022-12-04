export const arraySum = (a: number, b: number) => a + b;

export function getElementChildren(xmlDom: Element) : Element[] {
  const children : Element[] = [];
  for (let i = 0; i < xmlDom.childNodes.length; i++) {
    const childNode = xmlDom.childNodes.item(i);
    if (childNode.nodeType === childNode.ELEMENT_NODE) {
      children.push(childNode as Element);
    }
  }
  return children;
}

export function getTextContentWithoutChildren(xmlDom: Element) : string | undefined {
  let res = undefined;
  for (let i = 0; i < xmlDom.childNodes.length; i++) {
    const childNode = xmlDom.childNodes.item(i);
    if (childNode.nodeType === childNode.TEXT_NODE) {
      const trimmedValue = childNode.nodeValue?.trim();
      if (trimmedValue == null || trimmedValue == '') {
        continue;
      }
      res = res == null ? trimmedValue : res + trimmedValue
    }
  }
  return res;
}