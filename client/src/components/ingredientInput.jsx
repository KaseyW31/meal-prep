// Dropdown menu to add new ingredient
const IngredientInput = ({ key, ingredient, allIngredients, onIngredientChange, onQuantityChange }) => {
  return (
    <div>
      <select style={{background:'white'}} value={ingredient.ingredientId} onChange={onIngredientChange}>
        <option value="">Select Ingredient</option>
        {allIngredients.map((ing) => (
          <option key={ing._id} value={ing._id}>
            {ing.name}
          </option>
        ))}
      </select>
      <input type="number" value={ingredient.quantity} onChange={onQuantityChange} />
    </div>
  );
};

export default IngredientInput;