import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    constructor() {
        this.form = document.querySelector('#form');
        this.type = document.querySelector('#type');
        this.firstName = document.querySelector('#firstName');
        this.lastName = document.querySelector('#lastName');
        this.address = document.querySelector('#address');
        this.country = document.querySelector('#country');
        this.town = document.querySelector('#town');
        this.zip = document.querySelector('#zip');
        this.product = document.querySelector('#product');
        this.price = document.querySelector('#price');
        this.quantity = document.querySelector('#quantity');
        this.tva = document.querySelector('#tva');
        this.docContainer = document.querySelector('#document-container');
        this.hiddenDiv = document.querySelector('#hiddenDiv');
        this.storeEl = document.querySelector('#stored-data');
        this.btnPrint = document.querySelector('#print');
        this.btnReload = document.querySelector('#reload');
        this.btnStoredInvoices = document.querySelector('#stored-invoices');
        this.btnStoredEstimates = document.querySelector('#stored-estimates');
        //Listeners
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.reloadListener(this.btnReload);
        this.getStoredDocsListener();
    }
    // Listners
    submitFormListener() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    printListener(btn, docContainer) {
        btn.addEventListener('click', () => {
            let availableDoc;
            availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    reloadListener(btn) {
        btn.addEventListener('click', () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    getStoredDocsListener() {
        this.btnStoredInvoices.addEventListener('click', this.getItem.bind(this, 'invoice'));
        this.btnStoredEstimates.addEventListener('click', this.getItem.bind(this, 'estimate'));
    }
    getItem(docType) {
        if (this.storeEl.hasChildNodes()) {
            this.storeEl.innerHTML = "";
        }
        if (localStorage.getItem(docType)) {
            let array;
            array = localStorage.getItem(docType);
            if (array !== null && array.length > 2) {
                let arrayData;
                arrayData = JSON.parse(array);
                arrayData.map((doc) => {
                    let card = document.createElement('div');
                    let cardBody = document.createElement('div');
                    let cardClasses = ['card', 'mt-5'];
                    let cardBodyClasses = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(cardBodyClasses);
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storeEl.append(card);
                });
            }
            else {
                this.storeEl.innerHTML = '<div class="p-5"><p> Aucune data de disponible </p></div>';
            }
        }
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputData(); // Array or undefined
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            let docDatas;
            let date = new Date();
            docDatas = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            let template;
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docDatas, type);
        }
    }
    inputData() {
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
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert("Les valeurs numériques doivent être supérieures à 0 !");
            return;
        }
    }
}
