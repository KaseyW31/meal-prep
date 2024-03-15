import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IngredientInput from './ingredientInput';

// Manages form for creating/modifying a meal
export default function Meal() {
    const [form, setForm] = useState({
      name: "",
      ingredients: [],
    });
    const [allIngredients, setAllIngredients] = useState([]);
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    // Get all existing ingredients for dropdown menu
    useEffect(() => {
        async function fetchIngredData() {
        const ingredResponse = await fetch(
        `http://localhost:5000/ingredient`
        );
        if (!ingredResponse.ok) {
        const message = `An error has occurred: ${ingredResponse.statusText}`;
        console.error(message);
        return;
        }
        const allIngreds = await ingredResponse.json();
        setAllIngredients(allIngreds);
    }
    fetchIngredData();
    return;
    }, [])

    // Finds meal from url if already exists
    useEffect(() => {
        async function fetchData() {
          const id = params.id?.toString() || undefined;
          if(!id) return;
          setIsNew(false);
          const mealResponse = await fetch(
            `http://localhost:5000/meal/${params.id.toString()}`
          );
          if (!mealResponse.ok) {
            const message = `An error has occurred: ${mealResponse.statusText}`;
            console.error(message);
            return;
          }
          const meal = await mealResponse.json();
          if (!meal) {
            console.warn(`Meal with id ${id} not found`);
            navigate("/");
            return;
          }
          setForm(meal);
        }
        fetchData();
        return;
      }, [params.id, navigate]);
    
      // Update state properties
      function updateForm(value) {
        console.log(form);
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }

      function validateFormName() {
        if (form.name == "") {
          alert("Please give your meal a name");
          return false;
        }
        if (form.ingredients.length == 0) {
          alert("Please add at least one ingredient");
          return false;
        }
        return true;
      }
    
      // Posts new meal or patches existing
      async function onSubmit(e) {
        e.preventDefault();
        if (!validateFormName())
          return false;
        const _meal = { ...form };
        try {
          let response;
          if (isNew) {
            // for adding new meal
            response = await fetch("http://localhost:5000/meal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(_meal),
            });
          } else {
            // for updating existing meal
            response = await fetch(`http://localhost:5000/meal/${params.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(_meal),
            });
          }
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('A problem occurred with your fetch operation: ', error);
        } finally {
          setForm({ name: "", ingredients: [] });
          navigate("/");
        }
      }

      const handleIngredientChange = (e, index) => {
        const selectedIngredientId = e.target.value;
        const updatedIngredients = [...form.ingredients];
        updatedIngredients[index] = { ...updatedIngredients[index], ingredientId: selectedIngredientId };
        setForm({ ...form, ingredients: updatedIngredients });
      };
    
      const handleQuantityChange = (e, index) => {
        const quantity = e.target.value;
        const updatedIngredients = [...form.ingredients];
        updatedIngredients[index] = { ...updatedIngredients[index], quantity };
        setForm({ ...form, ingredients: updatedIngredients });
      };
    
      const addIngredient = () => {
        setForm({
          ...form,
          ingredients: [...form.ingredients, { ingredientId: '', quantity: '' }],
        });
      };

      // Displays form to create/modify meal
      return (
        <div className="container">
          <h3>Create/Update Meal Record</h3>
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
          {form.ingredients.map((ingredient, index) => (
            <IngredientInput
            key={index}
            ingredient={ingredient}
            unit={allIngredients.find((e) => e._id == ingredient.ingredientId)?.unit}
            allIngredients={allIngredients}
            onIngredientChange={(e) => handleIngredientChange(e, index)}
            onQuantityChange={(e) => handleQuantityChange(e, index)}
          />
      ))}
      <button type="button" onClick={addIngredient}>Add Ingredient</button>
      <br></br><br></br>
      <div className="form-group">
            <input
                type="submit"
                value="Save meal"
                className="btn btn-success"
            />
        </div>
        </form>
    </div>
 );
}