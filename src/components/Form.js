import React, { useState } from "react";

function Form () {

const [formInputs, setFormInput] = useState({
  description: "",
  image: "",
  location: ""
})

  function handleChange(e){
    console.log(e.target.name, e.target.value)
    setFormInput({...formInputs, 
      [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(formInputs)

    const newFormInputs = {
      "description": formInputs.description,
      "image": formInputs.image,
      "location": formInputs.location
    }
    console.log("new form inputs:", newFormInputs)

    fetch("http://localhost:6001/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormInputs),
    })
      .then((r) => r.json())
      .then((newListing) => console.log(newListing));

  }

  return (
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formInputs.description}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            ImageURL:
            <input
              type="text"
              name="image"
              value={formInputs.image}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
           Location: 
           <input
              type="text"
              name="location"
              value={formInputs.location}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
        <button type="submit">Submit Listing</button>
        </p>
      </form>
  )
}

export default Form;