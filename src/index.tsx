import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { init as initTranslation } from "./utils/translation";
import { init as initDateTimeLocale } from "./utils/datetime";
import { storage } from "./data/Storage";

async function init() {
  await initTranslation();
  await initDateTimeLocale();

  const container = document.getElementById("root");

  if (!container) {
    throw new Error("Can't find element in the document with id `root`");
  }

  // NOTE: We get a theme here to get rid of the blink due to React's
  //       lifecycle when the application starts.
  //       The theme is also controlled inside the `App` component
  let theme: string | undefined;
  try {
    theme = await storage.get.theme();
  } catch (err) {
    console.error(`Can't get theme ${(err as Error).message}`);
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App theme={theme} />
    </React.StrictMode>,
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  serviceWorkerRegistration.unregister();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

init().catch((err) => console.error(err));
