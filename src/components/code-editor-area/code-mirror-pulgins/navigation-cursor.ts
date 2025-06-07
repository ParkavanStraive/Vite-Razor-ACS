import { EditorView } from "@codemirror/view";
import { EditorSelection } from "@codemirror/state";

export const navigateToLine = (
  view: EditorView | null,
  lineNumber: number,
  charNumber: number
) => {
  if (!view) {
    console.error("Editor view is not available.");
    return;
  }

  if (lineNumber <= 0 || lineNumber > view.state.doc.lines) {
    console.error(`Line number ${lineNumber} is out of bounds.`);
    return;
  }

  const line = view.state.doc.line(lineNumber);

  const pos = Math.min(line.from + charNumber, line.to);

  view.dispatch({
    selection: EditorSelection.cursor(pos),
    effects: EditorView.scrollIntoView(pos, { y: "center" }),
  });

  view.focus();
};
