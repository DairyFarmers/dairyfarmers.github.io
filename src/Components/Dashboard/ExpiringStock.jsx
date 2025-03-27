import React from "react";
import { useSelector } from "react-redux";

let expiringSoon = [
    {
      "id": 101,
      "name": "Milk",
      "quantity": 20,
      "unit": "L",
      "expiration_date": "2025-04-10"
    },
    {
      "id": 102,
      "name": "Cheese",
      "quantity": 10,
      "unit": "kg",
      "expiration_date": "2025-04-12"
    },
    {
      "id": 103,
      "name": "Yogurt",
      "quantity": 15,
      "unit": "kg",
      "expiration_date": "2025-04-14"
    }
]

const ExpiringStock = () => {
  //const { inventory } = useSelector((state) => state.inventory);
  //const today = new Date();
//
  //const expiringSoon = inventory.filter((item) => {
  //  const expiryDate = new Date(item.expiration_date);
  //  const daysLeft = (expiryDate - today) / (1000 * 60 * 60 * 24);
  //  return daysLeft < 5;
  //});

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Expiring Stock</h2>
      {expiringSoon.length > 0 ? (
        <ul>
          {expiringSoon.map((item) => (
            <li key={item.id} className="text-red-500">
              {item.name} (Expires on {item.expiration_date})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-500">No expiring stock</p>
      )}
    </div>
  );
};

export default ExpiringStock;