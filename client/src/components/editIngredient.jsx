import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   qty: "",
   unit: "",
   ingredients: [],
 });
 const params = useParams();
 const navigate = useNavigate();
  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/ingredient/${params.id.toString()}`);
      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const ingredient = await response.json();
     if (!ingredient) {
       window.alert(`Ingredient with id ${id} not found`);
       navigate("/");
       return;
     }
      setForm(ingredient);
   }
    fetchData();
    return;
 }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
   e.preventDefault();
   const editedIngredient = {
     name: form.name,
     qty: form.qty,
     unit: form.unit,
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedIngredient),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/");
 }
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Ingredient</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="qty">Quantity</label>
         <input
           type="number"
           className="form-control"
           id="qty"
           value={form.qty}
           onChange={(e) => updateForm({ qty: e.target.value })}
         />
       </div>
       <div className="form-group">
        <label htmlFor="unit">Unit</label>
        <input
        type="text"
        className="form-control"
        id="unit"
        value={form.unit}
        onChange={(e) => updateForm({ unit: e.target.value })}
        />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Ingredient"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}