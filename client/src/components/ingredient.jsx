import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Ingredient() {
    const [form, setForm] = useState({
      name: "",
      qty: "",
      unit: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          const id = params.id?.toString() || undefined;
          if(!id) return;
          setIsNew(false);
          const response = await fetch(
            `http://localhost:5000/ingredient/${params.id.toString()}`
          );
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const ingredient = await response.json();
          if (!ingredient) {
            console.warn(`Ingredient with id ${id} not found`);
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
    
      // This function will handle the submission.
      async function onSubmit(e) {
        e.preventDefault();
        const ingred = { ...form };
        try {
          let response;
          if (isNew) {
            // if we are adding a new record we will POST to /record.
            response = await fetch("http://localhost:5000/ingredient", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ingred),
            });
          } else {
            // if we are updating a record we will PATCH to /record/:id.
            response = await fetch(`http://localhost:5000/ingredient/${params.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ingred),
            });
          }
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('A problem occurred with your fetch operation: ', error);
        } finally {
          setForm({ name: "", qty: "", unit: "" });
          navigate("/");
        }
      }
    
      // This following section will display the form that takes the input from the user.
      return (
        <div className="container">
          <h3>Create/Update Ingredient Record</h3>
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
                value="Save ingredient"
                className="btn btn-success"
            />
        </div>
        </form>
    </div>
 );
}