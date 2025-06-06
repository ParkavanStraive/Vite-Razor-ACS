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

  // Make sure the line number is within the document bounds
  if (lineNumber <= 0 || lineNumber > view.state.doc.lines) {
    console.error(`Line number ${lineNumber} is out of bounds.`);
    return;
  }

  // Get the line object from the document. .line() is 1-based.
  const line = view.state.doc.line(lineNumber);

  // Calculate the position. Make sure it doesn't exceed the line length.
  const pos = Math.min(line.from + charNumber, line.to);

  // Dispatch a transaction to update the selection and scroll
  view.dispatch({
    selection: EditorSelection.cursor(pos),
    effects: EditorView.scrollIntoView(pos, { y: "center" }),
  });

  // Ensure the editor is focused so the cursor is visible
  view.focus();
};
