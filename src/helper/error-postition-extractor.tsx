import React, { useState, useEffect } from "react";

// This component will receive the error message as a prop
const ErrorPositionExtractor = ({ message }) => {
  // 1. Initialize a state to hold the line and char.
  //    It's a single state object as requested.
  const [positionState, setPositionState] = useState({
    line: null,
    char: null,
  });

  // 2. Use the useEffect hook to run the regex logic.
  //    This effect will re-run whenever the `message` prop changes.
  useEffect(() => {
    // The regex pattern to find "number:number"
    const pattern = /(\d+):(\d+)/;

    // 3. Use JavaScript's .match() method to find the pattern in the message
    const match = message.match(pattern);

    // 4. Check if a match was found
    if (match) {
      // If found, update the state with the captured groups.
      // match[1] is the first captured group ("12")
      // match[2] is the second captured group ("9")
      // We use parseInt to convert the captured strings to numbers.
      setPositionState({
        line: parseInt(match[1], 10),
        char: parseInt(match[2], 10),
      });
    }
  }, [message]); // Dependency array: ensures this runs if `message` changes

  // 5. Render the output
  return (
    <div>
      <h2>Error Message Details</h2>
      <p>
        <strong>Original Message:</strong> "{message}"
      </p>
      <hr />
      <h3>Extracted State:</h3>
      {positionState.line !== null ? (
        <div>
          <pre>{JSON.stringify(positionState, null, 2)}</pre>
          <p>
            <strong>Line:</strong> {positionState.line}
          </p>
          <p>
            <strong>Character:</strong> {positionState.char}
          </p>
        </div>
      ) : (
        <p>No line:char pattern found.</p>
      )}
    </div>
  );
};
