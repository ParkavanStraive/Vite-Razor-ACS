import { Diagnostic, linter } from "@codemirror/lint";
import { XMLValidator } from "fast-xml-parser";

export const xmlSyntaxLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  const doc = view.state.doc.toString();

  try {
    const validation = XMLValidator.validate(doc, {
      allowBooleanAttributes: true,
    });

    if (validation !== true) {
      const error = validation as {
        err: {
          code: string;
          msg: string;
          line: number;
          col: number;
        };
      };

      //Crucial:  Handle potential errors from XMLValidator
      diagnostics.push({
        from: view.state.doc.line(error.err.line).from + error.err.col - 1,
        to: view.state.doc.line(error.err.line).from + error.err.col,
        severity: "error",
        message: error.err.msg,
      });
    }
  } catch (error: any) {
    // Handle potential errors during validation
    console.error("XML Validation Error:", error);
    // Add a generic error diagnostic
    diagnostics.push({
      from: 0,
      to: 0,
      severity: "error",
      message: "Invalid XML: " + error.message, // or a more user-friendly message
    });
  }

  return diagnostics;
});
