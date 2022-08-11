const PORT = process.env.PORT || 8000 //gives option of port for deployment
const express = require("express") // backend framework for node JS, executes code and listens to code
const axios = require("axios") // Will allow for the api functionalities such as put, get, delete, post
const cheerio = require("cheerio") // used to scrap web page
const { response } = require("express")

const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: '' //need a base as the href for the telegram is missing information
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: ''
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk'
    }

]
const app = express()

const articles = []

newspapers.forEach(newspaper => {
    //visiting URL, then get html of the URL, 
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            // find any elements within html with the specific tag and word
            // for each of them, give them the same title as the text
            $('a:contains("climate")', html).each(function (){
                const title = $(this).text() // get the title
                const url = newspaper.base +$(this).attr('href') // get the link

                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })
            
        }).catch((err) => console.log(err))
    }
    
)

//On the home page ('/') of the app, when recieve a request give a response of the string below
app.get('/', (req, res) => {
    res.json("Welcome to my Climate Change News API")
})

app.get('/news', (req, res) => {
    res.json(articles)  // give a response to the webpage of the current array of articles
})

app.get('/news/:newspaperId', (req, res) => { //newspaperId acts as a variable
    const publisher = req.params.newspaperId //get the news paper id that is wanted

    const newspaper = newspapers.filter(np => publisher === np.name)[0]
    
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            // find any elements within html with the specific tag and word
            // for each of them, give them the same title as the text
            const specificArticles = []
            $('a:contains("climate")', html).each(function (){
                const title = $(this).text() // get the title
                const url = newspaper.base +$(this).attr('href') // get the link

                specificArticles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })
            res.json(specificArticles)
            
        }).catch((err) => console.log(err))
})

// express will listen for changes to the specified port
// npm start will initialize the base server that we will use
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))