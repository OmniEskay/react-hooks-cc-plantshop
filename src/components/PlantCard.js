import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  function handleSoldOutClick() {
    setIsSoldOut(!isSoldOut);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(plant.id));
  }

  function handlePriceChange(e) {
    const newPrice = parseFloat(e.target.value);
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then(onUpdatePlant);
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>
        ${" "}
        <input
          type="number"
          step="0.01"
          value={plant.price}
          onChange={handlePriceChange}
        />
      </p>
      <button onClick={handleSoldOutClick} className={isSoldOut ? "primary" : ""}>
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>
      <button onClick={handleDeleteClick} className="secondary">
        Delete
      </button>
    </li>
  );
}

export default PlantCard;