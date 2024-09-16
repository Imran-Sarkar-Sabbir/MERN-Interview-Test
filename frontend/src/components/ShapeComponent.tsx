import { useContext, useState } from "react";
import {CanvasContext, ICanvasComponent} from "../pages/Whiteboard/CanvasContainer";

const ShapeComponent = (props: ICanvasComponent) => {
  const [focus, setFocus] = useState<boolean>(true);
  const { actions } = useContext(CanvasContext);

  const handleDoubleClick = () => {
    setFocus(true);
  };

  const handOnChange = (e: any) => {
    const value = e.target.value;
    actions?.updateCanvasData({ id: props.id ?? "black", content: value });
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={"shape"}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="image-upload-container"
        style={{
          backgroundColor: props.content ?? "skyblue",
          overflow: "hidden",
        }}
      >
        {focus && (
          <input
            className="shap-input"
            style={{
              height: "100%",
              width: "100%",
              opacity: "0",
            }}
            onBlur={onBlur}
            autoFocus={true}
            type="color"
            value={props.content}
            onChange={handOnChange}
          />
        )}
      </div>
    </div>
  );
};

export default ShapeComponent;
