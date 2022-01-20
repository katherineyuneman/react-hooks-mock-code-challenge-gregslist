import React, {useEffect, useState} from "react";
import ListingCard from "./ListingCard";
import Form from "./Form";

function ListingsContainer({search}) {

  const [listings, setListings] = useState([])
  const [sortBy, setSortBy] = useState("id")

  useEffect(() => {
    fetch("http://localhost:6001/listings")
    .then((r) => r.json())
    .then((listings) => setListings(listings));
  }, []);

  function handleDelete (deletedListing){
    console.log(deletedListing)
    const updatedListings = listings.filter((listing) => listing.id !== deletedListing.id);
    setListings(updatedListings);

  }

  function handleAddNewListing (newListing){
    const updatedListingList = [...listings, newListing]
    setListings(updatedListingList)
  }

  const listingCards = 
  listings
  .filter(listing => {
    return listing.description.toLowerCase().includes(search.toLowerCase())
  })
  .sort((listingA,listingB) => {
    if (sortBy === "id") {
      return listingA.id - listingB.id
    } else {
      return listingA.location.localeCompare(listingB.location)
    }
  })


  return (
    <main>
      <button onClick={() => setSortBy("id")}>Sort by Default</button>
      <button onClick={() => setSortBy("location")}>Sort By Location</button>
      <div>
        <h5>Submit New Listing</h5>
        <Form onAddNewListing={handleAddNewListing} />
      </div>
      <ul className="cards">
        {listingCards.map((listing) => (
        <ListingCard key={listing.id} listing={listing} onDelete={handleDelete}/>
        ))}
        
      </ul>
      
    </main>
  );
}

export default ListingsContainer;
