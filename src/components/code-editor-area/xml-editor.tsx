import React, { useEffect, useRef, useState } from "react";
import { EditorState, EditorStateConfig } from "@codemirror/state";
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

type XmlEditorProps = {
  xmlContent?: string;
  onChange?: (value: string) => void;
};

const xmlLanguage = LRLanguage.define({
  parser: xmlParser,
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
  },
});

const xmlSupport = new LanguageSupport(xmlLanguage);

const XmlEditor: React.FC<XmlEditorProps> = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const xmlContent = useAppSelector((state) => state.xml.xmlContent);
  const dispatch = useAppDispatch();

  const [content, setContent] = useState(xmlContent);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const updateListener = EditorView.updateListener.of(
        (update: ViewUpdate) => {
          if (update.docChanged) {
            const value = update.state.doc.toString();
            setContent(value);
            // onChange?.(value);
            // dispatch(updateXmlContent(value));
          }
        }
      );

      const minHeightExtension = EditorView.theme({
        ".cm-scroller": {
          minHeight: "730px", // roughly 200 lines at 20px/line
        },
      });

      const startState: EditorStateConfig = {
        doc: xmlContent,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          history(),
          keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
          xml(),
          xmlSupport,
          indentOnInput(),
          foldGutter(),
          lintGutter(),
          // oneDark,
          syntaxHighlighting(customXmlHighlighStyle),
          EditorView.lineWrapping,
          updateListener,
          // EditorView.theme({
          //   "&": {
          //     color: "#f8f8f2",
          //     backgroundColor: "#282a36",
          //   },
          //   ".cm-content": {
          //     caretColor: "#f8f8f0",
          //   },
          //   ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#f8f8f0" },
          //   "&.cm-focused .cm-selectionBackground, ::selection": {
          //     backgroundColor: "#44475a",
          //   },
          // }),
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
  }, [editorRef, xmlContent]);

  useEffect(() => {
    if (viewRef.current && xmlContent !== content) {
      const transactions = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: xmlContent,
        },
      });
      viewRef.current.dispatch(transactions);
    }
  }, [xmlContent, viewRef]);

  const handleOnblur = () => {
    const value = viewRef.current?.state.doc.toString();
    if (value !== xmlContent) {
      dispatch(updateXmlContent(value || ""));
    }
  };

  return (
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
  );
};

export default XmlEditor;
