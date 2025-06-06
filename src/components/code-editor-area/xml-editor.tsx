// // import React, { useEffect, useRef, useState } from "react";
// // import { EditorState, EditorStateConfig } from "@codemirror/state";
// // import {
// //   EditorView,
// //   lineNumbers,
// //   keymap,
// //   highlightActiveLineGutter,
// //   ViewUpdate,
// //   highlightActiveLine,
// // } from "@codemirror/view";
// // import {
// //   defaultKeymap,
// //   history,
// //   historyKeymap,
// //   indentWithTab,
// // } from "@codemirror/commands";
// // // Import searchKeymap
// // import { search, searchKeymap } from "@codemirror/search";
// // import { xml } from "@codemirror/lang-xml";
// // import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
// // import { parser as xmlParser } from "@lezer/xml";
// // import { updateXmlContent } from "@/features/xml-slice";
// // import { customXmlHighlighStyle } from "./code-mirror-pulgins/editor-decoration";
// // import { xmlSyntaxLinter } from "./code-mirror-pulgins/xml-syntax-linter";
// // import {
// //   foldGutter,
// //   indentOnInput,
// //   LanguageSupport,
// //   LRLanguage,
// //   syntaxHighlighting,
// // } from "@codemirror/language";
// // import { lintGutter } from "@codemirror/lint";
// // // import { searchPanelTheme } from "./code-mirror-pulgins/search-pannel-tab";

// // type XmlEditorProps = {
// //   xmlContent?: string;
// //   onChange?: (value: string) => void;
// // };

// // const xmlLanguage = LRLanguage.define({
// //   parser: xmlParser,
// //   languageData: {
// //     commentTokens: { block: { open: "" } },
// //   },
// // });

// // const xmlSupport = new LanguageSupport(xmlLanguage);

// // const XmlEditor: React.FC<XmlEditorProps> = () => {
// //   const editorRef = useRef<HTMLDivElement | null>(null);
// //   const viewRef = useRef<EditorView | null>(null);

// //   const xmlContent = useAppSelector((state) => state.xml.xmlContent);
// //   const dispatch = useAppDispatch();

// //   const [content, setContent] = useState(xmlContent);

// //   useEffect(() => {
// //     if (editorRef.current && !viewRef.current) {
// //       const updateListener = EditorView.updateListener.of(
// //         (update: ViewUpdate) => {
// //           if (update.docChanged) {
// //             const value = update.state.doc.toString();
// //             setContent(value);
// //             // onChange?.(value);
// //             // dispatch(updateXmlContent(value));
// //           }
// //         }
// //       );

// //       const minHeightExtension = EditorView.theme({
// //         ".cm-scroller": {
// //           minHeight: "730px", // roughly 200 lines at 20px/line
// //         },
// //       });

// //       const startState: EditorStateConfig = {
// //         doc: xmlContent,
// //         extensions: [
// //           lineNumbers(),
// //           highlightActiveLine(),
// //           highlightActiveLineGutter(),
// //           history(),
// //           search({ top: true }),
// //           keymap.of([
// //             indentWithTab,
// //             ...defaultKeymap,
// //             ...historyKeymap,
// //             ...searchKeymap, // Add search keymap for find/replace
// //           ]),
// //           xml(),
// //           xmlSupport,
// //           indentOnInput(),
// //           foldGutter(),
// //           lintGutter(),
// //           // oneDark,
// //           syntaxHighlighting(customXmlHighlighStyle),
// //           EditorView.lineWrapping,
// //           updateListener,
// //           // EditorView.theme({
// //           //   "&": {
// //           //     color: "#f8f8f2",
// //           //     backgroundColor: "#282a36",
// //           //   },
// //           //   ".cm-content": {
// //           //     caretColor: "#f8f8f0",
// //           //   },
// //           //   ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#f8f8f0" },
// //           //   "&.cm-focused .cm-selectionBackground, ::selection": {
// //           //     backgroundColor: "#44475a",
// //           //   },
// //           // }),
// //           minHeightExtension,
// //           xmlSyntaxLinter,
// //           // searchPanelTheme,
// //           EditorState.allowMultipleSelections.of(true),
// //         ],
// //       };

// //       const state = EditorState.create(startState);

// //       const view = new EditorView({
// //         state,
// //         parent: editorRef.current,
// //       });
// //       viewRef.current = view;

// //       return () => {
// //         view.destroy();
// //         viewRef.current = null;
// //       };
// //     }
// //   }, [editorRef, xmlContent]);

// //   useEffect(() => {
// //     if (viewRef.current && xmlContent !== content) {
// //       const transactions = viewRef.current.state.update({
// //         changes: {
// //           from: 0,
// //           to: viewRef.current.state.doc.length,
// //           insert: xmlContent,
// //         },
// //       });
// //       viewRef.current.dispatch(transactions);
// //     }
// //   }, [xmlContent, viewRef]);

// //   const handleOnblur = () => {
// //     const value = viewRef.current?.state.doc.toString();
// //     if (value !== xmlContent) {
// //       dispatch(updateXmlContent(value || ""));
// //     }
// //   };

// //   return (
// //     <div
// //       onBlur={handleOnblur}
// //       ref={editorRef}
// //       style={{
// //         fontSize: "14px",
// //         width: "100%",
// //         height: "100%",
// //         overflow: "auto",
// //       }}
// //     />
// //   );
// // };

// // export default XmlEditor;

// import React, { useEffect, useRef, useState } from "react";
// // 1. Import EditorSelection and EditorView
// import {
//   EditorState,
//   EditorStateConfig,
//   EditorSelection,
// } from "@codemirror/state";
// import {
//   EditorView,
//   lineNumbers,
//   keymap,
//   highlightActiveLineGutter,
//   ViewUpdate,
//   highlightActiveLine,
// } from "@codemirror/view";
// import {
//   defaultKeymap,
//   history,
//   historyKeymap,
//   indentWithTab,
// } from "@codemirror/commands";
// import { search, searchKeymap } from "@codemirror/search";
// import { xml } from "@codemirror/lang-xml";
// import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
// import { parser as xmlParser } from "@lezer/xml";
// import { updateXmlContent } from "@/features/xml-slice";
// import { customXmlHighlighStyle } from "./code-mirror-pulgins/editor-decoration";
// import { xmlSyntaxLinter } from "./code-mirror-pulgins/xml-syntax-linter";
// import {
//   foldGutter,
//   indentOnInput,
//   LanguageSupport,
//   LRLanguage,
//   syntaxHighlighting,
// } from "@codemirror/language";
// import { lintGutter } from "@codemirror/lint";
// import { navigateToLine } from "./code-mirror-pulgins/navigation-cursor";
// import { clearNavigationTarget } from "@/features/error-navigation-slice";

// type XmlEditorProps = {
//   xmlContent?: string;
//   onChange?: (value: string) => void;
// };

// const xmlLanguage = LRLanguage.define({
//   parser: xmlParser,
//   languageData: {
//     commentTokens: { block: { open: "" } },
//   },
// });

// const xmlSupport = new LanguageSupport(xmlLanguage);

// const XmlEditor: React.FC<XmlEditorProps> = () => {
//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const viewRef = useRef<EditorView | null>(null);

//   const xmlContent = useAppSelector((state) => state.xml.xmlContent);
//   const dispatch = useAppDispatch();

//   const [content, setContent] = useState(xmlContent);

//   useEffect(() => {
//     if (editorRef.current && !viewRef.current) {
//       const updateListener = EditorView.updateListener.of(
//         (update: ViewUpdate) => {
//           if (update.docChanged) {
//             const value = update.state.doc.toString();
//             setContent(value);
//           }
//         }
//       );

//       const minHeightExtension = EditorView.theme({
//         ".cm-scroller": {
//           minHeight: "730px",
//         },
//       });

//       const startState: EditorStateConfig = {
//         doc: xmlContent,
//         extensions: [
//           lineNumbers(),
//           highlightActiveLine(),
//           highlightActiveLineGutter(),
//           history(),
//           search({ top: true }),
//           keymap.of([
//             indentWithTab,
//             ...defaultKeymap,
//             ...historyKeymap,
//             ...searchKeymap,
//           ]),
//           xml(),
//           xmlSupport,
//           indentOnInput(),
//           foldGutter(),
//           lintGutter(),
//           syntaxHighlighting(customXmlHighlighStyle),
//           EditorView.lineWrapping,
//           updateListener,
//           minHeightExtension,
//           xmlSyntaxLinter,
//           EditorState.allowMultipleSelections.of(true),
//         ],
//       };

//       const state = EditorState.create(startState);
//       const view = new EditorView({
//         state,
//         parent: editorRef.current,
//       });
//       viewRef.current = view;

//       return () => {
//         view.destroy();
//         viewRef.current = null;
//       };
//     }
//   }, [editorRef, xmlContent]);

//   useEffect(() => {
//     if (viewRef.current && xmlContent !== content) {
//       const transactions = viewRef.current.state.update({
//         changes: {
//           from: 0,
//           to: viewRef.current.state.doc.length,
//           insert: xmlContent,
//         },
//       });
//       viewRef.current.dispatch(transactions);
//     }
//   }, [xmlContent, viewRef]);

//   const handleOnblur = () => {
//     const value = viewRef.current?.state.doc.toString();
//     if (value !== xmlContent) {
//       dispatch(updateXmlContent(value || ""));
//     }
//   };

//   const { targetPosition } = useAppSelector(
//     (state) => state.lineCharNavigation
//   );

//   useEffect(() => {
//     if (targetPosition) {
//       navigateToLine(viewRef.current, targetPosition.line, targetPosition.char);

//       dispatch(clearNavigationTarget());
//     }
//   }, [targetPosition, dispatch]);

//   return (
//     <>
//       <div
//         onBlur={handleOnblur}
//         ref={editorRef}
//         style={{
//           fontSize: "14px",
//           width: "100%",
//           height: "100%",
//           overflow: "auto",
//         }}
//       />
//     </>
//   );
// };

// export default XmlEditor;

import React, { useEffect, useRef } from "react";
import { EditorState, EditorStateConfig, Transaction } from "@codemirror/state";
import {
  EditorView,
  lineNumbers,
  keymap,
  highlightActiveLineGutter,
  ViewUpdate,
  highlightActiveLine,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { search, searchKeymap } from "@codemirror/search";
import { xml } from "@codemirror/lang-xml";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import { parser as xmlParser } from "@lezer/xml";
import { updateXmlContent } from "@/features/xml-slice";
import { customXmlHighlighStyle } from "./code-mirror-pulgins/editor-decoration";
import { xmlSyntaxLinter } from "./code-mirror-pulgins/xml-syntax-linter";
import {
  foldGutter,
  indentOnInput,
  LanguageSupport,
  LRLanguage,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintGutter } from "@codemirror/lint";
import { navigateToLine } from "./code-mirror-pulgins/navigation-cursor";
import { clearNavigationTarget } from "@/features/error-navigation-slice";

type XmlEditorProps = {
  xmlContent?: string;
  onChange?: (value: string) => void;
};

const xmlLanguage = LRLanguage.define({
  parser: xmlParser,
  languageData: {
    commentTokens: { block: { open: "" } },
  },
});

const xmlSupport = new LanguageSupport(xmlLanguage);

const XmlEditor: React.FC<XmlEditorProps> = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const xmlContent = useAppSelector((state) => state.xml.xmlContent);
  const targetPosition = useAppSelector(
    (state) => state.lineCharNavigation.targetPosition
  );
  const dispatch = useAppDispatch();

  // 1. REMOVED the local `useState` for `content`. It's not needed and complicates things.

  // 2. This useEffect now runs ONLY ONCE on mount, creating a stable editor instance.
  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const minHeightExtension = EditorView.theme({
        ".cm-scroller": {
          minHeight: "730px",
        },
      });

      const startState: EditorStateConfig = {
        doc: xmlContent, // Initial content from Redux
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          history(), // This is the key to Ctrl+Z
          search({ top: true }),
          keymap.of([
            indentWithTab,
            ...defaultKeymap,
            ...historyKeymap, // This provides the keybindings for undo/redo
            ...searchKeymap,
          ]),
          xml(),
          xmlSupport,
          indentOnInput(),
          foldGutter(),
          lintGutter(),
          syntaxHighlighting(customXmlHighlighStyle),
          EditorView.lineWrapping,
          minHeightExtension,
          xmlSyntaxLinter,
          EditorState.allowMultipleSelections.of(true),
        ],
      };

      const state = EditorState.create(startState);
      const view = new EditorView({
        state,
        parent: editorRef.current,
      });
      viewRef.current = view;

      return () => {
        view.destroy();
        viewRef.current = null;
      };
    }
    // The empty dependency array `[]` ensures this effect runs only once.
  }, []);

  // 3. This useEffect handles updates FROM Redux TO the editor.
  useEffect(() => {
    const view = viewRef.current;
    // If the editor exists and the Redux content is different from the editor's content...
    if (view && xmlContent !== view.state.doc.toString()) {
      // ...update the editor with the new content.
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: xmlContent,
        },
        annotations: Transaction.addToHistory.of(false),
      });
    }
  }, [xmlContent]); // This only depends on the external content from Redux.

  // This useEffect handles navigation events (no changes here)
  useEffect(() => {
    if (targetPosition) {
      navigateToLine(viewRef.current, targetPosition.line, targetPosition.char);
      dispatch(clearNavigationTarget());
    }
  }, [targetPosition, dispatch]);

  // 4. The onBlur handler now pushes the editor's content TO Redux.
  const handleOnblur = () => {
    const view = viewRef.current;
    if (view) {
      // Get the current content from the editor itself
      const currentEditorContent = view.state.doc.toString();
      // Only dispatch if the content has actually changed
      if (currentEditorContent !== xmlContent) {
        dispatch(updateXmlContent(currentEditorContent));
      }
    }
  };

  return (
    <>
      <div
        onBlur={handleOnblur}
        ref={editorRef}
        style={{
          fontSize: "14px",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      />
    </>
  );
};

export default XmlEditor;
