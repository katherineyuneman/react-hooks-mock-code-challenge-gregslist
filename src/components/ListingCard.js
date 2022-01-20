import React, {useState} from "react";

function ListingCard({listing, onDelete}) {

  const [favorite, setFavorite] = useState("emoji-button favorite")

  function handleFavoriteClick(e){
    let updateFavorite = e.target.className
    console.log(updateFavorite);
    if (updateFavorite === "emoji-button favorite"){
      updateFavorite =  "emoji-button favorite active";
      setFavorite(updateFavorite)
      return updateFavorite
    } else updateFavorite = "emoji-button favorite";
    setFavorite(updateFavorite)
    return updateFavorite
    
  }

  function handleDeleteClick(){
    fetch(`http://localhost:6001/listings/${listing.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(listing));
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={listing.image} alt={listing.description} />
      </div>
      <div className="details">
        {true ? (
          <button className={favorite} onClick={handleFavoriteClick}>★</button>
        ) : (
          <button className="emoji-button favorite">☆</button>
        )}
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button className="emoji-button delete" onClick={handleDeleteClick}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
