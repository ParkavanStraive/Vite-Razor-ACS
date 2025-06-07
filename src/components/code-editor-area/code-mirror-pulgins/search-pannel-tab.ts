import { EditorView } from "@codemirror/view";

// Define the custom theme for the search panel
export const searchPanelTheme = EditorView.theme(
  {
    // This styles the main panel or "tab"
    ".cm-panel.cm-search": {
      backgroundColor: "#3a3f51",
      color: "white",
      padding: "5px 0",
    },
    // This styles the input fields
    ".cm-panel.cm-search input": {
      backgroundColor: "#2a2d3a",
      color: "white",
      border: "1px solid #666",
      borderRadius: "4px",
      fontSize: "14px",
      margin: "0 4px",
    },
    // This is a general style for all buttons
    ".cm-panel.cm-search button": {
      backgroundColor: "#4f566b",
      backgroundImage: "none", // Remove default gradients/images
      color: "#d4d4d4",
      border: "1px solid #555",
      borderRadius: "4px",
      margin: "0 4px",
      cursor: "pointer",
    },
    // This changes the button style on hover
    ".cm-panel.cm-search button:hover": {
      backgroundColor: "#686e84",
      color: "white",
    },
    // You can even style specific buttons, like the "close" button
    '.cm-panel.cm-search button[name="close"]': {
      color: "#ff8a8a",
      fontWeight: "bold",
    },
  },
  { dark: true }
); // Use {dark: true} if this is for a dark theme
