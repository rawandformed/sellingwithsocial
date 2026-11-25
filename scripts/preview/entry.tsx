/* Entry for the single-file preview. Renders the same page component the site uses. */
import { createRoot } from "react-dom/client";

import Page from "@/app/page";

createRoot(document.getElementById("root")!).render(<Page />);
