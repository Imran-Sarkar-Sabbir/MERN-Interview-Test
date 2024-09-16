import { useEffect, useState } from "react";
import CanvasContainer, { ICanvasData } from "./CanvasContainer";
import { useParams } from "react-router";
import { useCanvasDataById } from "../../services/whiteboardService";

export function WhiteboardPage() {
  const params = useParams();
  const [canvasData, setCanvasData] = useState<ICanvasData[]>([]);
  const [metaData, setMetaData] = useState({
    uuid: params.boardId,
    title: "Untitled",
  });

  const { data, isLoading } = useCanvasDataById(params.boardId);

  useEffect(() => {
    console.log(data)
    setCanvasData(data?.canvasComponents ?? []);
    setMetaData((prev) => ({...prev, title: data?.title ?? "Untitled"}))
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-6 h-6 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>{" "}
          <div>Loading ...</div>
        </div>
      </div>
    );
  }

  return (
    <CanvasContainer
      canvasData={canvasData}
      setCanvasData={setCanvasData}
      metaData={metaData}
      setMetaData={setMetaData}
    />
  );
}
