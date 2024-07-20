// Step 1: Import necessary React and external libraries/modules
import React, { useEffect, useState } from "react";
import Stepper from "awesome-react-stepper";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Step 2: Import utility function
import {getImageUrlFromRequirement} from '../utilities';

// Step 3: Import requirements data
import requirements from '../data/requirements.json';

// Step 4: Define a functional component named 'RequestStepper'
export default function RequestStepper({onSubmit}) {

    // Step 4.1: Declare state variables and their setter methods
    const [category, setCategory] = useState('');
    const [values, setValues] = useState({
        fare: '',
        requirement: '',
        time: '09:30'
    });

     // Step 4.2: Function to handle changes in form inputs
    const valueOnChange = (event) => {
        setValues((previouData) => ({
            ...previouData,
            [event.target.name]: event.target.value,
          }));
    }

    // Step 4.3: Function to submit the form
    const submit = () => {
        onSubmit({...values, category});
    }

    // Step 4.4: Render the component
    return (

        // Step 4.4.1: Stepper component with a submit button
        <Stepper submitBtn={<Button onClick={submit} className="defaultBtn">Submit</Button>}>

            {/* Step 4.4.1.1: First form section - Select Category */}
            <div className="stepper-form">
                <div className="my-4">
                    <h6>whats your name</h6>
                    <input placeholder="Enter your name" name="name" onChange={valueOnChange} className="w-100" type="type" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                    
                </div>
            </div>
            {/* Step 4.4.1.2: Second form section - Select Requirements */}
            <div className="stepper-form">
                <Requirements data={requirements} onChange={valueOnChange} value={values.requirement} />
            </div>

            {/* Step 4.4.1.3: Third form section - Enter Fare and Display Image */}
            <div className="stepper-form">
                <div className="my-4">
                    <h6>whats your age</h6>
                    <input placeholder="Enter your age" name="age" onChange={valueOnChange} className="w-100" type="number" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                    
                </div>
            </div>

            {/* Step 4.4.1.4: Fourth form section - Enter Time and Display Image */}
            <div className="stepper-form">
                <div className="my-4">
                    <h6>from which village your</h6>
                    <input placeholder="Enter your village name" name="village" onChange={valueOnChange} className="w-100" type="type" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                   
                </div>
            </div>
            <div className="stepper-form">
                <div className="my-4">
                    <h6>how much you need to be paid daily</h6>
                    <input placeholder="enter on dailybase " name="salary" onChange={valueOnChange} className="w-100" type="number" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                   
                </div>
            </div>
            <div className="stepper-form">
                <div className="my-4">
                    <h6>whats your number</h6>
                    <input placeholder="enter your number " name="number" onChange={valueOnChange} className="w-100" type="number" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                   
                </div>
            </div>
            <div className="stepper-form">
                <div className="my-4">
                    <h6>whats your experience ?</h6>
                    <input placeholder="experience " name="experience" onChange={valueOnChange} className="w-100" type="number" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                   
                </div>
            </div>
            <div className="stepper-form">
                <div className="my-4">
                    <h6>what's your time limit?</h6>
                    <input placeholder="time limit " name="limit" onChange={valueOnChange} className="w-100" type="number" defaultValue={values.fare} id="fare" />
                </div>
                <div className="row justify-content-center mt-4">
                   
                </div>
            </div>
        </Stepper>
    );
}

// Step 5: Sub-component for handling Requirements
function Requirements({ data, value, onChange }) {
    // Step 5.1: Declare state variable and its setter method
    const [requirementImage, setRequirementImage] = useState('');

    // Step 5.2: Initialize default requirement image
    const initDefaultRequirementImage = () => {

        // Check if a value is already selected
        if (value && value.length) {
            setRequirementImage(getImageUrlFromRequirement(value));
        } else {

            // Set the default image based on the first requirement in the data array
            const requirement = data.length ? data[0] : {};
            setRequirementImage(requirement.image);
        }
    };

    // Step 5.3: useEffect hook to initialize default image
    useEffect(() => {
        initDefaultRequirementImage();
    }, []);

    // Step 5.4: Function to handle changes in requirement selection
    const valueOnChange = (event) => {
        onChange(event);
        // Update the image based on the selected requirement
        setRequirementImage(getImageUrlFromRequirement(event.target.value));
    };

    // Step 5.5: Render the component
    return (
        <div className="my-4">
            <h6>Select requirement</h6>
            {/* Step 5.5.1: Dropdown for selecting requirements */}
            <select onChange={valueOnChange} name="skill" className="form-select">
                {data.map((option, index) => (
                    <option key={index} defaultChecked={option.value === value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Step 5.5.2: Display image based on the selected requirement */}
            <div className="row justify-content-center mt-4">
                <img alt="" src={requirementImage} style={{ height: '100px', objectFit: 'contain' }} />
            </div>
        </div>
    );
}


// Step 6: Component for selecting category
function SelectCategory({ category, onChange }) {

    // Step 6.1: Function to handle changes in category selection
    const valueOnChange = (event, type) => {

        // Step 6.1.1: Check if the checkbox is checked
        if (event.target.value === 'on') {

            // Step 6.1.2: Trigger the onChange callback with the selected category type
            onChange(type);
        }
    }

    // Step 6.2: Render the component
    return (
        <div className="my-4">
            <h6>Choose category</h6>
            {/* Step 6.2.1: Display checkboxes for selecting categories */}
            <div className="row justify-content-center mt-4">

                {/* Step 6.2.1.1: Food Delivery category */}
                <div className="col-6 col-md-4">
                    <input
                        id="delivery"
                        onChange={(e) => valueOnChange(e, 'delivery')}
                        className="d-none"
                        name="category"
                        defaultChecked={category === 'delivery'}
                        type="checkbox"
                    />
                    <label htmlFor="delivery">
                        {/* Step 6.2.1.1.1: Card component for styling */}
                        <Card className="bg-light">
                            <Card.Body>

                                {/* Step 6.2.1.1.2: Title for the category */}
                                <Card.Title className="text-center">Food delivery</Card.Title>

                                 {/* Step 6.2.1.1.3: Subtitle with an image for the category */}
                                <Card.Subtitle className="my-2 text-muted text-center">

                                    <img
                                        src={"https://www.blinkco.io/wp-content/uploads/2021/10/contactless-delivery-rider-blink-io.jpg"}
                                        className="w-100"
                                        style={{ borderRadius: '5px', width: '150px', height: '85px' }}
                                    />
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </label>
                </div>

                {/* Step 6.2.1.2: Travel category */}
                <div className="col-6 col-md-4">
                    <input
                        className="d-none"
                        onChange={(e) => valueOnChange(e, 'drop')}
                        name="category"
                        defaultChecked={category === 'drop'}
                        type="checkbox"
                        id="drop"
                    ></input>
                    <label htmlFor="drop">

                         {/* Step 6.2.1.2.1: Card component for styling */}
                        <Card className="bg-light">
                            <Card.Body>

                                {/* Step 6.2.1.1.2: Title for the category */}
                                <Card.Title className="text-center">Travel</Card.Title>

                                {/* Step 6.2.1.1.3: Subtitle with an image for the category */}
                                <Card.Subtitle className="my-2 text-muted text-center">
                                    <img
                                        src={"https://static.tnn.in/thumb/msid-98108681,width-1280,height-720,resizemode-75/98108681.jpg"}
                                        className="w-100"
                                        style={{ borderRadius: '5px', width: '150px', height: '85px' }}
                                    />
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </label>
                </div>
            </div>
        </div>
    );
}
