import React, { useCallback, useRef, useState } from 'react';
import CanvasComponent from '../../components/CanvasComponent';
import { submitCanvasData } from '../../services/whiteboardService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toolbar from '../../components/Toolbar';
export const CanvasContext = React.createContext<ICanvasContext>({});

export interface ICanvasData {
  component?: string;
  id?: string;
  position?: { top: number; left: number };
  dimension?: { width: string; height: string };
  content?: string;
  type: string;
}

export interface ICanvasComponent {
  position?: { top: number; left: number };
  dimension?: { width: string; height: string };
  content?: string;
  id?: string;
  type: string;
  isReadOnly?: boolean;
}

export interface ICanvasContext {
  state?: {
    canvasData: ICanvasData[];
    activeSelection: Set<string>;
    enableQuillToolbar: boolean;
    isSubmitting: boolean;
    title: string;
  };
  actions?: {
    setCanvasData: React.Dispatch<React.SetStateAction<ICanvasData[]>>;
    setActiveSelection: React.Dispatch<React.SetStateAction<Set<string>>>;
    updateCanvasData: (data: Partial<ICanvasComponent>) => void;
    addElement: (type: string) => void;
    setEnableQuillToolbar: (state: boolean) => void;
    handleSubmitData: () => void;
    handleChangeName: (title: string) => void;
  };
}

const getInitialData = (data: any[], type: string = 'TEXT') => {
  return {
    type: type,
    id: `${type}__${Date.now()}__${data.length}`,
    position: {
      top: 100,
      left: 100,
    },
    dimension: {
      width: '150',
      height: type === 'TEXT' ? '50' : '150',
    },
    content: type === 'TEXT' ? 'Sample Text' : 'skyblue',
  };
};

const CanvasContainer = ({
  canvasData,
  setCanvasData,
  metaData,
  setMetaData,
}) => {
  const [activeSelection, setActiveSelection] = useState<Set<string>>(
    new Set(),
  );
  const [enableQuillToolbar, setEnableQuillToolbar] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isSelectAll = useRef<boolean>(false);

  const updateCanvasData = (data: Partial<ICanvasComponent>) => {
    const currentDataIndex =
      canvasData.findIndex((canvas: { id: string }) => canvas.id === data.id) ??
      -1;
    const updatedData = { ...canvasData?.[currentDataIndex], ...data };
    canvasData.splice(currentDataIndex, 1, updatedData);
    setCanvasData([...(canvasData || [])]);
  };

  const addElement = (type: string) => {
    const defaultData = getInitialData(canvasData, type);
    setCanvasData([...canvasData, { ...defaultData, type: type ?? 'TEXT' }]);
    activeSelection.clear();
    activeSelection.add(defaultData.id);
    setActiveSelection(new Set(activeSelection));
  };

  const deleteElement = useCallback(() => {
    setCanvasData([
      ...canvasData.filter((data: any) => {
        if (data.id && activeSelection.has(data.id)) {
          activeSelection.delete(data.id);
          return false;
        }
        return true;
      }),
    ]);
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData, setCanvasData]);

  const selectAllElement = useCallback(() => {
    isSelectAll.current = true;
    canvasData.map((data: any) => activeSelection.add(data.id || ''));
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);

  const handleSubmitData = async () => {
    try {
      setIsSubmitting(true);
      await submitCanvasData({
        ...metaData,
        canvasComponents: canvasData,
      });
      toast('Saved');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeName = async (title: string) => {
    setMetaData((prev: any) => ({ ...prev, title }));
  };

  const context: ICanvasContext = {
    actions: {
      setCanvasData,
      setActiveSelection,
      updateCanvasData,
      addElement,
      setEnableQuillToolbar,
      handleSubmitData,
      handleChangeName,
    },
    state: {
      canvasData,
      activeSelection,
      enableQuillToolbar,
      isSubmitting,
      title: metaData.title,
    },
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        deleteElement();
      } else if (['a', 'A'].includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        selectAllElement();
      }
    },
    [deleteElement, selectAllElement],
  );

  const outSideClickHandler = () => {
    isSelectAll.current = false;
    setActiveSelection(new Set());
  };

  const handleMouseDown = useCallback(() => {
    if (!isSelectAll.current) {
      return;
    }

    outSideClickHandler();
    isSelectAll.current = false;
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);

  return (
    <div ref={containerRef} className="container mx-auto">
      <CanvasContext.Provider value={context}>
        <Toolbar isEditEnable={enableQuillToolbar} />
        <div className="canvas-container">
          {canvasData.map((canvas: any) => {
            return <CanvasComponent {...canvas} />;
          })}
        </div>
        {/* {JSON.stringify(canvasData)} */}
      </CanvasContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default CanvasContainer;
