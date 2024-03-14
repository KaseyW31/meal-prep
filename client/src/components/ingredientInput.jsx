const IngredientInput = ({ ingredients, onIngredientChange, onQuantityChange }) => {
  return (
    <div>
      <select onChange={onIngredientChange}>
        <option value="">Select Ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient._id} value={ingredient._id}>
            {ingredient.name}
          </option>
        ))}
      </select>
      <input type="number" onChange={onQuantityChange} />
    </div>
  );
};

export default IngredientInput;