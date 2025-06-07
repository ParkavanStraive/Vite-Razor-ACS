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
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (view && xmlContent !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: xmlContent,
        },
        annotations: Transaction.addToHistory.of(false),
      });
    }
  }, [xmlContent]);

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
      const currentEditorContent = view.state.doc.toString();
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
