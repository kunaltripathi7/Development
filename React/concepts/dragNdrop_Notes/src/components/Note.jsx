import { forwardRef } from "react";

// forward ref is used to expose a dom node to parent compo like here we can directly manipulate this div from parent compo, either pass to another compo or useImperativeHandle(custom obj)

const Note = forwardRef(function ({ content, initialPos, ...props }, ref) {
  // way to recieve multiple params
  // ...props means rest whatever is transferred
  return (
    <div
      ref={ref}
      style={{
        width: "200px",
        backgroundColor: "lightblue",
        userSelect: "none",
        border: "1px solid black",
        top: `${initialPos?.x}px`,
        left: `${initialPos?.y}px`,
        padding: "10px",
        cursor: "move",
        position: "absolute",
      }} // userSelect none doesn't allow to select text
      {...props}
    >
      📌{content}
    </div>
  );
});

export default Note;
