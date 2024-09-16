import ShapeComponent from "./ShapeComponent";
import {ICanvasComponent} from "../pages/Whiteboard/CanvasContainer";

const CircleComponent = (props: ICanvasComponent) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <ShapeComponent {...props} />
    </div>
  );
};

export default CircleComponent;
