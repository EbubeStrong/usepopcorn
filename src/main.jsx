import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import StarRating from "./StarRating/StarRating";
// import StarTest from "./StarRating/StarTest";
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <App /> 
  </StrictMode>

    // <StarRating maxRating={5} />
    // <StarRating
    //   maxRating={5}
    //   color="red"
    //   size={20}
    //   className="starTest"
    //   messages={["bad", "fairly", "good", "great", "excellent"]}
    // />
    // <StarTest />
);
