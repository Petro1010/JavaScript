import React from "react";
import GoogleMapReact from 'google-map-react'
import {Paper, Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'

function Map(props){
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width:600px)') //pass in test to see if mobile or not
    
    return (
        <div className={classes.mapContainer}>
            {/* Get the google map component */}
            <GoogleMapReact
                bootstrapURLKeys={{key : process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={props.coordinates}
                center={props.coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                //options={''}
                onChange={(e) => {
                    //When map changes so do the coordinates and boundaries
                    props.setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    props.setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => {
                    props.setChildClicked(child)
                    //console.log(child)
                }}
            >
                {/* if the places prop is populated, then it will map all the places into just markers if on mobile or cards if on desktop*/}
                {props.places?.map((place, ind) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={ind}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size='small' value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;