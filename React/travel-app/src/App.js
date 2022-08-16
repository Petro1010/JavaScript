import React from "react";
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  //store the current places shown on the map
  const [places, setPlaces] = React.useState([])
  //filtered places
  const [filteredPlaces, setFilteredPlaces] = React.useState([])
  //store coords of center of map
  const [coordinates, setCoordinates] = React.useState({lat: 0, lng: 0})
  //store coords of top right and bottom left of map
  const [bounds, setBounds] = React.useState({})

  //store what location on map has been clicked
  const [childClicked, setChildClicked] = React.useState(null)

  //Used for when the page is loading
  const [isLoading, setIsLoading] = React.useState(false)

  // stores the type of locations user is interesterd in
  const [type, setType] = React.useState('restaurants')
  // stores the level of rating we want to display
  const [rating, setRating] = React.useState('')

  React.useEffect(() => {
    //get the users current location
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  React.useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
    setChildClicked(null)
  }, [rating])

  //fetch the places data through our API call function, must be run everytime our position changes
  React.useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          //console.log(data)
          setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
          setFilteredPlaces([])
          setIsLoading(false)
          setChildClicked(null) //make sure the child is no longer clicked after reseting
        })
    }
    
  }, [type, bounds])
  return (
    <div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12 /* Takes full width on mobile devices */} md={4 /* Takes 4/12 spaces on medium devices */}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12 /* Takes full width on mobile devices */} md={8 /* Takes 8/12 spaces on medium devices */}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
