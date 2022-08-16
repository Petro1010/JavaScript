import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

function PlaceDetails(props){
    const classes = useStyles();

    // if this specific place details is selected , then scroll it into view
    //console.log(props.refProp)
    if (props.selected) props.refProp?.current?.scrollIntoView({ behavior: "smooth", block: 'start'})

    return (
        <Card elevation={6}>
            <CardMedia
                style={{height: 350 }}
                image={props.place.photo ? props.place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={props.place.name}
            />
            <CardContent>
                {/* Name of place */}
                <Typography gutterBottom variant="h5">{props.place.name}</Typography>
                {/* Rating of Place */}
                <Box display='flex' justifyContent='space-between'>
                    <Rating value={Number(props.place.rating)} readOnly/>
                    <Typography gutterBottom variant='subtitle1'>out of {props.place.num_reviews} reviews</Typography>
                </Box>
                {/* Price range of place */}
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{props.place.price_level}</Typography>
                </Box>
                {/* Ranking compared to places near by */}
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{props.place.ranking}</Typography>
                </Box>
                {/* If the place has awards, display them */}
                {props.place?.awards?.map((award) => (
                    <Box my={1} display='flex' justifyContent='space-between'>
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))}
                {/* If the place is a restaurant/has food, show the options */}
                {props.place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size='small' label={name} className={classes.chip}/>
                ))}
                {/* If the place has an address show it */}
                {props.place?.address && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /> {props.place.address}
                    </Typography>
                )}
                {/* If the place has a phone number show it */}
                {props.place?.phone && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon /> {props.place.phone}
                    </Typography>
                )}
                {/* Set up card buttons for the trip advisor review and website */}
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(props.place.web_url, '_blank')}> {/* Open website on click in new tab */}
                        Trip Advisor Review
                    </Button>
                    <Button size='small' color='primary' onClick={() => window.open(props.place.website, '_blank')}> {/* Open website on click in new tab */}
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>    
    );
}

export default PlaceDetails;