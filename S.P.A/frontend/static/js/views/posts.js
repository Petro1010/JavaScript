import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor(params) {
        super(params); //call the super constructor
        this.setTitle("Posts"); //set up the title of the tab
    }

    async getHtml(){
        return `
            <h1> Tasks </h1>
            <div className="Hello" style="display: flex; height : 50px">
                <input id="taskin" style="width: 500px; font-family: Arial, Helvetica, sans-serif; font-size: 17px;">
                <button id="addbtn" className="btn" style="background-color: blue; cursor: pointer; font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: white; border-radius: 30%; width: 100px; font-size: 15px; margin-left: 20px;"> Add Item </button>
                <button id="clrbtn" className="btn" style="background-color: red; cursor: pointer; font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: white; border-radius: 30%; width: 100px; font-size: 15px; margin-left: 20px;"> Clear All </button>
            </div>
            <div style="overflow: auto; border-style: solid; border-width: 2px; border-color: black; margin-top: 30px; height: 500px;">
                <ul id="tasks"></ul>
            </div>
        `;
    }
}