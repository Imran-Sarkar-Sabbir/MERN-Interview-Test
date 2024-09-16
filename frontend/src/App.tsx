import HomePage from "./pages/HomePage";
import "./styles.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {WhiteboardPage} from "./pages/Whiteboard";


export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>,
        },
        {
            path: ":boardId",
            element: <WhiteboardPage/>,
        },
    ]);

    return <div>
        <RouterProvider router={router}/>
    </div>
}
