// Step 1: Import necessary React and external libraries/modules
import React from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";

// Step 2: Define a default set of images for different categories
const defaultImages = {
    drop: "/rider.jpg",
    delivery: "/food.jpeg",
};

// Step 3: Define a functional component named 'RequestCard'
export default function RequestCard({ data, onOrderAccept, image = '', styles = {}, actionButton = false, classNames='', initAOS=false }) {

    const containerClassNames = "action-card text-black px-0 position-relative " + classNames;

    // Step 4: Function to get the card image based on the category
    const getCardImage = (cardData) => {
        let { category } = cardData;

        // Use the default image if no specific image is provided
        return defaultImages[category] || '/default_large.png';    };

    // Step 5: Render the component
    return (

        // Step 5.1: Anchor link as the card container with additional classes and styles
        <a href="#" className={containerClassNames} data-aos={initAOS && 'fade-up'} style={styles}>

            {/* Step 5.2: Ribbon to display the category */}
            <div className="ribbon pe-4 text-capitalize right">
                {data.name}
            </div>

            {/* Step 5.3: Image element for the card */}
            <img src={image || getCardImage(data)} alt="" className="card__img" />

            {/* Step 5.4: Footer section with details like requirement and creation date */}
            <span className="card__footer pb-2">
                <span className="text-capitalize">{data.skill}</span>
                <span className="text-capitalize">{data.village}</span>
                <span className="text-capitalize">{data.salary}</span>
                <span className="text-capitalize">{data.age}</span>
                <span className="text-capitalize">{data.number}</span>
                <span className="text-capitalize">{data.experience}</span>
                <span className="text-capitalize">{data.limit}</span>
            
               
            </span>

            {/* Step 5.5: Conditional rendering of action button */}
            {actionButton ? (
                <span className="card__action">
                  
                    {/* Step 5.5.1: Bootstrap Button for accepting the order */}
                    <Button variant="dark" id={data._id} onClick={onOrderAccept}>
                        hire
                    </Button>
                </span>
            ) : ''}
        </a>
    );
}
