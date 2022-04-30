import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor(params) {
        super(params); //call the super constructor
        this.setTitle("Settings"); //set up the titile of the tab
    }

    async getHtml(){
        return `
            <h1> Settings </h1>
            <p>
                Manage Privacy and configuration
            </p>
        `;
    }
}