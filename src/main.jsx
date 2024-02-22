import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Routes";

import Context from "./Context/Context";

// const store = createStore(reducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <Context>
    <RouterProvider router={router} />
    </Context>
    
    {/* </Provider> */}
  </React.StrictMode>
);
