import ShapeComponent from "./ShapeComponent";
import {ICanvasComponent} from "../pages/Whiteboard/CanvasContainer";

const SquareComponent = (props: ICanvasComponent) => {
  return <ShapeComponent {...props} />;
};

export default SquareComponent;
