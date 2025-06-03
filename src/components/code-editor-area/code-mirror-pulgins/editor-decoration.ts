import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

export const customXmlHighlighStyle = HighlightStyle.define([
  {
    tag: t.tagName,
    color: "#569CD6",
    // fontWeight: "bold",
  },
  {
    tag: t.attributeName,
    color: "#9CDCFE",
  },
  {
    tag: t.angleBracket,
    color: "#808080",
  },
  {
    tag: t.comment,
    color: "#008000",
    fontStyle: "italic",
  },
  {
    tag: t.string,
    color: "#CE9178",
  },
  {
    tag: t.number,
    color: "#ff7b72",
  },
  {
    tag: t.bracket,
    color: "#D4D4D4",
  },
]);
