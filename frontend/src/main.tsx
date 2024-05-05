import { render } from "preact";
import { App } from "./app.tsx";
import "./i18n.ts";

render(<App />, document.getElementById("app")!);
