import { HasHTMLFormat } from "../interfaces/HasHTMLFormat.js";
import { Datas } from "../classes/Datas.js"
import { HasRender } from "../interfaces/HasRender.js";
import { Display } from "./Display.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { Print } from "./Print.js";

export class FormInput{

    form: HTMLFormElement
    type: HTMLSelectElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    address: HTMLInputElement;
    country:HTMLInputElement;
    town:HTMLInputElement;
    zip:HTMLInputElement;
    product: HTMLInputElement;
    price: HTMLInputElement;
    quantity: HTMLInputElement;
    tva: HTMLInputElement;
    docContainer: HTMLDivElement;
    hiddenDiv: HTMLDivElement;
    btnPrint : HTMLButtonElement;
    btnReload: HTMLButtonElement;
    btnStoredInvoices: HTMLButtonElement;
    btnStoredEstimates: HTMLButtonElement;
    storeEl: HTMLDivElement;

    

    constructor() {
        this.form = document.querySelector('#form') as HTMLFormElement;
        this.type = document.querySelector('#type') as HTMLSelectElement;
        this.firstName = document.querySelector('#firstName') as HTMLInputElement;
        this.lastName = document.querySelector('#lastName') as HTMLInputElement;
        this.address = document.querySelector('#address') as HTMLInputElement;
        this.country = document.querySelector('#country') as HTMLInputElement;
        this.town = document.querySelector('#town') as HTMLInputElement;
        this.zip = document.querySelector('#zip') as HTMLInputElement;
        this.product = document.querySelector('#product') as HTMLInputElement;
        this.price = document.querySelector('#price') as HTMLInputElement;
        this.quantity = document.querySelector('#quantity') as HTMLInputElement;
        this.tva = document.querySelector('#tva') as HTMLInputElement;


        this.docContainer = document.querySelector('#document-container') as HTMLDivElement;
        this.hiddenDiv = document.querySelector('#hiddenDiv') as HTMLDivElement;
        this.storeEl = document.querySelector('#stored-data') as HTMLDivElement;
        
        this.btnPrint = document.querySelector('#print') as HTMLButtonElement;
        this.btnReload = document.querySelector('#reload') as HTMLButtonElement;
        this.btnStoredInvoices = document.querySelector('#stored-invoices') as HTMLButtonElement;
        this.btnStoredEstimates = document.querySelector('#stored-estimates') as HTMLButtonElement;
        
        

            //Listeners
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.reloadListener(this.btnReload);
        this.getStoredDocsListener();

    }


        // Listners
    private submitFormListener(): void {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    private printListener(btn: HTMLButtonElement, docContainer: HTMLDivElement) {
        btn.addEventListener('click', () => {
            let availableDoc: HasPrint;
            availableDoc = new Print(docContainer);
            availableDoc.print()
        })
    }

    private reloadListener(btn: HTMLButtonElement){
        btn.addEventListener('click', () => {
            document.location.reload();
            window.scrollTo(0,0)
        })
    }

    private getStoredDocsListener(): void {
        this.btnStoredInvoices.addEventListener('click', this.getItem.bind(this, 'invoice'));
        this.btnStoredEstimates.addEventListener('click', this.getItem.bind(this, 'estimate'));
    }

    private getItem(docType: string) {
        if(this.storeEl.hasChildNodes()){
            this.storeEl.innerHTML = ""
        }

        if(localStorage.getItem(docType)){
            let array: string | null;
            array = localStorage.getItem(docType);

            if(array!== null && array.length > 2){
                let arrayData : string[];
                arrayData = JSON.parse(array);

                arrayData.map( (doc: string) : void => {
                    let card: HTMLDivElement = document.createElement('div');
                    let cardBody: HTMLDivElement = document.createElement('div');
                    let cardClasses: string[] = ['card', 'mt-5'];
                    let cardBodyClasses: string = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(cardBodyClasses);

                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storeEl.append(card);
                })
            } else {
                this.storeEl.innerHTML = '<div class="p-5"><p> Aucune data de disponible </p></div>'
            }
        }
    }

    private handleFormSubmit(e: Event) {
        e.preventDefault();
        
        const inputs = this.inputData(); // Array or undefined

        if(Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs

            let docDatas: HasHTMLFormat;
            let date: Date = new Date();

            docDatas = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);

            let template: HasRender;
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint)

            template.render(docDatas, type);

            
        }
    }

    private inputData(): [string, string, string, string, string, string, number, string, number, number, number] | void {

        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;

        if(zip > 0 && price > 0 && quantity> 0 && tva> 0){
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva]        
        } else {
            alert("Les valeurs numériques doivent être supérieures à 0 !");
            return;
        }
    }

}
