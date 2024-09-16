import { useContext } from "react";
import {CanvasContext} from "../pages/Whiteboard/CanvasContainer";

export const sizeList = ["9px", "12px", "16px", "20px", "28px"];

export const fontList = [
  "Arial",
  "Arial Black",
  "Arial Unicode MS",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  `Segoe UI, wf_segoe-ui_normal, helvetica, arial, sans-serif`,
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Georgia",
  "Lucida Sans Unicode",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

interface IToolbarProps {
  isEditEnable: boolean;
}

export default function Toolbar({ isEditEnable }: IToolbarProps) {
  const { actions, state } = useContext(CanvasContext);
  const addElement = (type: string) => {
    actions?.addElement(type);
  };

  const handleChange = (e) => {
    actions.handleChangeName(e.target.value);
  };

  return (
    <div style={{ display: "flex" }} className="bg-gray-300">
      {isEditEnable && (
        <div id="toolbar">
          <select className="ql-font">
            {fontList.map((font) => (
              <option value={font}>{font}</option>
            ))}
          </select>
          <select className="ql-size">
            {sizeList.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </div>
      )}
      <div className="toolbar-item" onClick={() => addElement("TEXT")}>
        Text
      </div>
      <div className="toolbar-item" onClick={() => addElement("SQUARE")}>
        Square
      </div>
      <div className="toolbar-item" onClick={() => addElement("CIRCLE")}>
        Circlel
      </div>
      {/*<div className="toolbar-item" onClick={() => addElement("IMAGE")}>*/}
      {/*  Image*/}
      {/*</div>*/}

      <div
        className="flex items-center justify-center cursor-pointer select-none"
        style={{
          marginLeft: "auto",
        }}
      >
        <div className="max-w-sm space-y-3">
          <input
            type="text"
            className="py-3 px-4 w-64"
            placeholder="This is placeholder"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-green-600 hover:bg-green-800 h-full w-24 text-white"
          onClick={actions.handleSubmitData}
        >
          Save
        </button>
      </div>
    </div>
  );
}
