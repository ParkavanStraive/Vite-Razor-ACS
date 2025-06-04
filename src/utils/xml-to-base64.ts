import * as jsdom from "jsdom";

export const xmlToBase64 = async (xmlString: string) => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(xmlString);
  const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
  if (xmlDoc.documentElement.nodeName === "parsererror") {
    throw new Error("Invalid XML format");
  }
  const xmlStringEncoded = new XMLSerializer().serializeToString(xmlDoc);
  const base64String = btoa(xmlStringEncoded);
  return base64String;
};
