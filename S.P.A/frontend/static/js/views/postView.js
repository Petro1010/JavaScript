import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor(params) {
        super(params); //call the super constructor
        this.setTitle("Viewing Post"); //set up the titile of the tab
    }

    async getHtml(){
        return `
            <h1> Posts </h1>
            <p>
                Viewing the Posts
            </p>
        `;
    }
}