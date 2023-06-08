import { Storage } from "./Storage.js";
export class Display {
    constructor(container, hiddenDiv, btnPrint) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.btnPrint = btnPrint;
        this.formContainer = document.querySelector("#form-container");
    }
    render(docObj, docType) {
        const htmlString = docObj.htmlFormat();
        this.container.innerHTML = htmlString;
        new Storage(docType, htmlString);
        if (docType === 'invoice') {
            this.btnPrint.innerText = "Imprimer la facture";
        }
        else if (docType === 'estimate') {
            this.btnPrint.innerText = "Imprimer la devis";
        }
        this.hiddenDiv.classList.remove('invisible');
        this.formContainer.innerHTML = "";
    }
}
