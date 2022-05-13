import React from "react";

function Meme() {
    
    //state saved for current meme
    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "",
        randomImage : ""
    });

    //state saved for all the memes
    const [allMemes, setAllMemes] = React.useState([]);

    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically returns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

    //make API request and load data once
    //2 ways: Using then and using an async function
    React.useEffect(() => {
        /* Method 1:
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
        */
       //Method 2:
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }
        getMemes();
    }, []);

    //console.log(allMemes);


    //onclick function
    function chooseMeme() {
        let memeImg = allMemes[Math.floor(Math.random()*allMemes.length)].url; //get random meme picture
        //update our meme object
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage : memeImg
            }
        });  //update our current meme state
    }

    //allows us to update the text as it changes with the users input
    function updateText(event) {
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })

    }

    return (
        <main>
            <div>
                <div className="form">
                    <input 
                        type="text" 
                        placeholder="Top text" 
                        className="form--input" 
                        name="topText"
                        onChange={updateText}
                        value={meme.topText}
                    />
                    <input 
                        type="text" 
                        placeholder="Bottom text" 
                        className="form--input"
                        name="bottomText"
                        onChange={updateText}
                        value={meme.bottomText}
                    />
                    <button className="form--button" onClick={chooseMeme}>Get a new meme image</button>
                </div>
                <div className="meme">
                    <img src={meme.randomImage} className="meme--img"></img>
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>

                
            </div>
        </main>
    );
};

export default Meme;