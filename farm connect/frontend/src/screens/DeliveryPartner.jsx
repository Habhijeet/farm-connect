// Step 1: Import necessary React and external libraries/modules
import React, { useEffect, useState, useRef } from "react";
import swal from "sweetalert";
import axios from "axios";
import aos from 'aos';
import 'aos/dist/aos.css';

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RequestCard from "../components/RequestCard";

// Step 2: Import data from external sources
import requirements from '../data/requirements.json';
import { loadRequests, updateRequestStatus } from "../utilities";
import Loading from "../components/Loader";
import { HOST } from "../constants";

// Step 3: Define a functional component named 'DeliveryPartner'
export default function DeliveryPartner(props) {
    // Step 4: Declare state variable and its setter method
    const [requests, setRequests] = useState([]);
    const [isItemsLoading, setItemsLoading] = useState(false)

    // for implementation of infinite scroll
    const endReached = useRef(false);
    const dataExists = useRef(true)
    const url = useRef('/api/app/?status=pending');
    const totalPages = useRef(0);
    const interSectionOptions = useRef({
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust the threshold as needed
      });

    const handleOnScrollDataItemsLoad = async () => {

        setItemsLoading(true)

        const {data} = await axios.get(HOST + url.current);
        const {response} = data;

        let {last_page, next_page_url} = response;
        let newCardData = response.data;

        totalPages.current = last_page;

        if (!next_page_url) {
            endReached.current = true;
        } else {
            url.current = next_page_url;
        }

        if (!newCardData.length) {
            dataExists.current = false;
        }

        setRequests((previous) => {
            let previousCardIds = previous.map(elem => elem._id);
            newCardData = newCardData.filter(elem => !previousCardIds.includes(elem._id));

            return previous.concat(newCardData);
        });

        setItemsLoading(false);
    }

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !endReached.current) {
            handleOnScrollDataItemsLoad();
          }
        });
      }

    // Step 5: Define function to handle order acceptance
    const onOrderAccept = async (event) => {
        // Extract the id from the clicked element
        const id = event.target.id;

        const status = 'approved';

        await updateRequestStatus(status, id);

        // Remove the card associated with the accepted order
        setRequests(current => current.filter(item => item._id !== id));

        // Show success message
        swal('Success!', 'Accepted successfully!', 'success');
    }

    // Step 6: Function to get image URL based on the requirement
    const getImageUrlFromRequirement = (requirement) => {
        // Find the matching requirement in the data and retrieve the image URL
        let item = requirements.find(e => e.value == String(requirement).toLowerCase().split(' ').join(''));
        return item && item.image;
    }

    useEffect(() => {
        handleOnScrollDataItemsLoad().then(() => {
            // Observe the div at page end.  Once it comes to the view port, execute the load cards method
            const observer = new IntersectionObserver(handleIntersect, interSectionOptions.current);

            observer.observe(document.getElementById('page-end'));

            aos.init();
        });
    }, []);

    // Step 7: Render the component
    return (
        <>
            {/* Step 7.1: Include the 'NavBar' component */}
            <NavBar />

            {/* Step 7.2: Main content container */}
            <div className="container mt-5 pt-4 background">
                {/* Step 7.3: Heading for the component */}
                <h1 className="mb-4 text-center pt-5">Pending requests</h1>

                
                    {(!requests.length && dataExists.current) ? <Loading /> : (
                        <div className="row justify-content-center">
                                {dataExists.current ? requests.map((item, index) => {
                                    return (
                                        <RequestCard
                                            // Step 7.4.1: Include an action button on the card
                                            actionButton={true}
                                            // Step 7.4.2: Customize styles for the card
                                            styles={{ width: "35rem", height: "28rem" }}
                                            // Step 7.4.3: Pass the order acceptance function to the card
                                            onOrderAccept={onOrderAccept}
                                            // Step 7.4.4: Pass data and image URL to the card
                                            data={item} key={index}
                                            image={getImageUrlFromRequirement(item.skill)}
                                            classNames="m-5 shadow"
                                            initAOS={true}
                                        />
                                    )
                                }) : <h1 className="text-center">No data was found!</h1>}

                        </div>
                    )}
                    {isItemsLoading ? (<h1 className="text-center">Please wait...</h1>) : ''}
            </div>

            {/* Step 7.5: Include the 'Footer' component */}
            {/* <Footer /> */}
            <div id="page-end"></div>
        </>
    );
}