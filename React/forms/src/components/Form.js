import React from "react"

export default function Form() {
    //use an object to manage our forms state:
    const [formData, setFormData] = React.useState(
        {firstName: "", lastName: "", email: "", comments: "", isFriendly: true, employment: "", favColour: ""}
    );
    
    function handleChange(event) {
        //take previous state, keep all the properties and change the property that is targeted
        setFormData(prevState => {
            const {name, value, type, checked} = event.target
            return {
                ...prevState, //keep old properties
                [name]: type === "checkbox" ? checked : value  //targets name directly linked to its current value
            }
        });
    }

    //handling a form submit
    function handleSubmit(event){
        event.preventDefault(); //stops it from refreshing page
        console.log(formData);
    }
    
    //label each input with a name of the same thing in the object
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName  /* This will ensure our state is controlling the inputs. Controlled Component */}  
            />
            <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
            />
            <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
            />

            {/* A text area component is like a box where the user can write */}
            <textarea
                placeholder="Comments"
                name="comments"
                onChange={handleChange}
                value={formData.comments}
            />

            {/* Check Boxes within react, just hold boolean values */}
            <input 
                type="checkbox"
                id="isFriendly"
                name="isFriendly"
                checked={formData.isFriendly}
                onChange={handleChange}
            />

            {/* Attach this label to an input, if label is clicked so is checkbox*/}
            <label htmlFor="isFriendly"> Are you friendly? </label>

            {/* Radio Buttons in react */}
            <br />
            <br />
            
            <fieldset>
                <legend>Current employment status</legend>
                
                <input 
                    type="radio"
                    id="unemployed"
                    name="employment"
                    value="unemployed"
                    checked={formData.employment === "unemployed"  /* This is to control the radio box output yourself*/}
                    onChange={handleChange}
                />
                <label htmlFor="unemployed">Unemployed</label>
                <br />
                
                <input 
                    type="radio"
                    id="part-time"
                    name="employment"
                    value="part-time"
                    onChange={handleChange}
                    checked={formData.employment === "part-time"}
                />
                <label htmlFor="part-time">Part-time</label>
                <br />
                
                <input 
                    type="radio"
                    id="full-time"
                    name="employment"
                    value="full-time"
                    onChange={handleChange}
                    checked={formData.employment === "full-time"}
                />
                <label htmlFor="full-time">Full-time</label>
                <br />
            </fieldset>
            {/* Select Box with its different options */}

            <label htmlFor="favColor">What is your favorite color?</label>
            <br />
            <select 
                id="favColor"
                value={formData.favColour}
                onChange={handleChange}
                name="favColour"
            >
                <option value="">--Choose--</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="violet">Violet</option>
            </select>
            {/* All buttons within a Form will be automatically taken as a submit button */}
            <button>Submit</button>
        </form>
    )
}