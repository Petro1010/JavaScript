import React, { createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

function List(props){
    // needed to use our style sheet we defined
    const classes = useStyles()

    const [elRefs, setElRefs] = React.useState([])

    React.useEffect(() => {
        // create references for all the places
        setElRefs((refs) => Array(props.places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [props.places])
    

    return (
        <div className={classes.container}>
            <Typography variant='h4'></Typography>
            {props.isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
            <>
                {/* A FormControl is like a list which can be selected from */}
                <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select value={props.type} onChange={(e) => props.setType(e.target.value)}>
                        <MenuItem value='restaurants'>Restaurants
                        </MenuItem>
                        <MenuItem value='hotels'>Hotels</MenuItem>
                        <MenuItem value='attractions'>Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={props.rating} onChange={(e) => props.setRating(e.target.value)}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>Above 3</MenuItem>
                        <MenuItem value={4}>Above 4</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={3} className={classes.list}>
                    {/* This grid will display the info of all the current places we are considering */}
                    {props.places?.map((place, ind) => (
                        /* Give each element a ref from our ref array 
                        Element is selected if the child clicked on shares the same id*/
                        <Grid item ref={elRefs[ind]} key={ind} xs={12}>
                            <PlaceDetails 
                                place={place}
                                selected={Number(props.childClicked) === ind}
                                refProp={elRefs[ind]}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
            )}
        </div>
    );
}

export default List;