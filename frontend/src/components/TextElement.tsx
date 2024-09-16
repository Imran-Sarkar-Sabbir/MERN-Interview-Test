import React, { useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {CanvasContext, ICanvasComponent} from "../pages/Whiteboard/CanvasContainer";
import {fontList, sizeList} from "./Toolbar";

const Size = Quill.import("attributors/style/size");
Size.whitelist = sizeList;

const Font = Quill.import("attributors/style/font");
Font.whitelist = fontList;

Quill.register(Font, true);
Quill.register(Size, true);

const TextElement = (props: ICanvasComponent) => {
  const { content, id, isReadOnly } = props;
  const { actions } = useContext(CanvasContext);
  const editorRef = React.useRef(null);

  const updateEditorValue = (value: string) => {
    actions?.updateCanvasData({ id, content: value });
  };

  const modules = {
    toolbar: "#toolbar",
  };
  // if (conatiner && dimension) {
  //   const { offsetHeight, offsetWidth } = conatiner;
  //   const { width } = conatiner.getBoundingClientRect();
  //   scale = Math.min(
  //     parseFloat(dimension?.width ?? 0) / offsetWidth
  //     // parseFloat(dimension?.height ?? 0) / offsetHeight
  //   );
  //   console.log(scale);
  // }

  return (
    <>
      <div>
        {isReadOnly ? (
          <div
            className="ql-editor"
            style={{
              fontFamily: "Arial",
              fontSize: "13px",
              padding: 0,
            }}
          >
            {ReactHtmlParser(content || "")}
          </div>
        ) : (
          <ReactQuill
            ref={editorRef}
            readOnly={isReadOnly}
            theme="snow"
            className="quill-container"
            modules={modules}
            value={content}
            onChange={updateEditorValue}
          />
        )}
      </div>
    </>
  );
};

export default TextElement;
