// Step 1: Import necessary React and external libraries/modules
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import swal from "sweetalert";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// Step 2: Import custom components and modules defined by the developer
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RequestStepper from "../components/RequestStepper";
import { createRequest } from '../utilities';
import requirements from '../data/requirements.json';
import { loadRequests } from "../utilities";
import Loading from "../components/Loader";
import RequestCard from "../components/RequestCard";



// Step 3: Define a functional component named 'User'
export default function User(props) {
    // Step 4: Declare state variables and their setter methods
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests().then(response => setRequests(response.data));
    }, [])

    const [open, setOpen] = useState(false);

    // Step 5: Define functions to handle modal show/hide state
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);

    // Step 6: Define function to handle form submission
    const dataOnSubmit = async (data) => {
        const response = await createRequest(data);
        console.log(response)

        data._id = response.insertedId;

        // Update the state with the new request
        setRequests((previousData) => ([data, ...previousData]));

        // Close the modal
        setOpen(false);

        // Show success message
        swal('Success!', 'Created successfully!', 'success');
    }

    // Step 7: Function to get image based on the requirement
    const getImageBasedOnRequirement = (requirement) => {
        let item = requirements.find(e => e.value === String(requirement).toLowerCase().split(' ').join(''));
        return item && item.image;
    }

    // Step 8: Settings configuration for the Slider component
    const settings = {
        className: "center-slider",
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        arrows: true,
        dots: true,
        speed: 300,
        infinite: true,
        autoplaySpeed: 2500,
        autoplay: true
    };

    // Step 9: Render the component
    return (
        <>
            {/* Step 9.1: Include the 'NavBar' component */}
            <NavBar />

            {/* Step 9.2: Main content container */}
            <div className="px-4 mt-5 background">
                <div className="row mt-5 justify-content-center">
                    {/* Step 9.2.1: Heading for the component */}
                    <h1 className="pt-5 text-center">Orders and deliveries</h1>
                </div>
           
                {/* Step 9.3: Slider component for displaying requests */}
                {!requests.length ? <Loading /> : (
                    <Slider {...settings}>
                        {requests.map((item, index) => <RequestCard data={item} image={getImageBasedOnRequirement(item.skill)} key={index} />)}
                    </Slider>
                )}
                
            </div>

            {/* Step 9.4: SpeedDial for triggering the 'handleShow' function */}
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 60, right: 60 }}
                icon={<SpeedDialIcon className="mt-3" />}
                onClick={handleShow}
            />

            {/* Step 9.5: Dialog for adding a new request */}
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
                {/* Step 9.5.1: Dialog title */}
                <DialogTitle>Add new request</DialogTitle>

                {/* Step 9.5.2: Close button for the dialog */}
                <IconButton onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    {/* Step 9.5.2.1: Close icon */}
                    <FontAwesomeIcon icon={faClose} />
                </IconButton>

                {/* Step 9.5.3: Dialog content */}
                <DialogContent>
                    {/* Step 9.5.3.1: RequestStepper component for user input */}
                    <RequestStepper onSubmit={dataOnSubmit} />
                </DialogContent>
            </Dialog>

            {/* Step 9.6: Include the 'Footer' component */}
            <Footer />
        </>
    );
}
