import dashboard from "./views/dashboard.js";
import posts from "./views/posts.js";
import settings from "./views/settings.js";
import postView from "./views/postView.js";

//this will convert our path to a regex and allow us to match generic paths. Ex. if we have many paths for different posts, we can treat them all the same if they follow the same regex
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

//This will stop the reloading of the page
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        //whenever user goes to a specific path, run the function defined
        {path: "/", view: dashboard },  //reference our dashboard class
        {path: "/posts", view: posts },
        {path: "/posts/:id", view: postView },
        {path: "/settings", view: settings }
    ];

    //Test each route for potential match
    //take in each route, tells us if our pathname from current location (location.pathname will contain 1 of the 3 paths) is the same as the route path
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    //console.log(potentialMatches);
    //go through potential match array, find the potential match in which result is exists
    let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    //set up a default if a matching path is not found
    if (!match){
        match = {
            route: routes[0],  //default in this case is the Dashboard
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));  //making an instance of the view
    console.log(view);

    document.querySelector("#app").innerHTML = await view.getHtml();  //replacing our div element's html(has the id of app) with the one we defined

    //set up the task adding
    taskFunc();
};

const taskFunc = () => {
    const addbtn = document.getElementById("addbtn");
    const tasks = document.getElementById("tasks");
    const input = document.getElementById("taskin");
    const clear = document.getElementById("clrbtn");
    addbtn.onclick = () => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(input.value));
        tasks.appendChild(li);
        input.value = "";
    }
    clear.onclick = () => {
        tasks.innerHTML = "";
    }
}

//making it so that the router still works if the user backs out of page or gos forward
window.addEventListener("popstate", router);

//Upon loading of our DOM, set up the router
document.addEventListener("DOMContentLoaded", () => {
    //grab event, and if it has an attribute of data-link. event.target will be our link elements.
    document.body.addEventListener("click", event => {
        if (event.target.matches("[data-link]")){
            //stop default behavior of following link and refreshing page
            event.preventDefault();
            //navigate to href instead of refreshing page
            navigateTo(event.target.href);
        }
    });
    router();
});