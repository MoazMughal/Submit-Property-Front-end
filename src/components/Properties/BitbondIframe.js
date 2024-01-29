// BitbondIframe.js
import React, { useEffect } from "react";
import classes from "./BitbondIframe.module.css";
import images from "../../assets/imageMap";

const BitbondIframe = ({ propertyData }) => {
  useEffect(() => {
    // Create and append the container for both card and iframe
    const container = document.createElement("div");
    container.className = classes.container;
    document.body.appendChild(container);

    // Create card container
    const cardContainer = document.createElement("div");
    cardContainer.className = classes.cardContainer;

    // Create card element
    const card = document.createElement("div");
    card.className = classes.card;

    // Image container
    const imageContainer = document.createElement("div");
    imageContainer.className = classes.imageContainer;

    // Add the image from the PropertyCard
    const propertyImageElement = document.createElement("img");
    propertyImageElement.src = images.dubaiMobile; // Replace with your actual image source
    imageContainer.appendChild(propertyImageElement);

    // Append image container to card
    card.appendChild(imageContainer);

    // Details container
    const detailsContainer = document.createElement("div");
    detailsContainer.className = classes.detailsContainer;

    // Display specific property details
    const specificDetails = ["annualizedReturn", "preferredCurrency", "noOfRooms"];
    for (const key of specificDetails) {
      const listItem = document.createElement("div");
      listItem.textContent = `${key}: ${propertyData[key]}`;
      detailsContainer.appendChild(listItem);
    }

    // Append details container to card
    card.appendChild(detailsContainer);

    // Append card to card container
    cardContainer.appendChild(card);

    // Append card container to the left of the iframe
    container.appendChild(cardContainer);

    // Create and append the Bitbond iframe dynamically
    const iframe = document.createElement("iframe");
    iframe.src = "https://tokentool.bitbond.com/tokensale/0xc6Bad015440D055E7cef8bFa0a26fdC65f171fC5?chainId=80001";
    iframe.width = "100%";
    iframe.height = "1000px";
    iframe.frameBorder = "0";
    iframe.name = "tokensale";

    // Append the iframe to the container
    container.appendChild(iframe);

    // Clean up function to remove the container when the component unmounts
    return () => {
      document.body.removeChild(container);
    };
  }, [propertyData]);

  return null;
};

export default BitbondIframe;
