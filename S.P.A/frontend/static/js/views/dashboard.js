import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor(params) {
        super(params); //call the super constructor
        this.setTitle("Dashboard"); //set up the titile of the tab
    }

    async getHtml(){
        return `
            <h1> Welcome to the Productivity Handler! </h1>
            <p>
                Use this application to track things that need to be done.
            </p>
        `;
    }
}