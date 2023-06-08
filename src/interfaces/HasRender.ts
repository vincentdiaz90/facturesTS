import { HasHTMLFormat } from "./HasHTMLFormat.js";

export interface HasRender {
    render(docObj: HasHTMLFormat, docType: string): void;
}