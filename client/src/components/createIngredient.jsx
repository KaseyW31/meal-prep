import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   qty: "",
   unit: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newIngred = { ...form };
    await fetch("http://localhost:5000/ingredient/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newIngred),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ name: "", qty: "", unit: "" });
   navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Ingredient</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
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
       <div className="form-group">
         <input
           type="submit"
           value="Create ingredient"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}