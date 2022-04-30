export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;  //updates title of the tab
    }

    async getHtml() {
        return "";  //for this interface, we do not need to define this just yet
    }
}