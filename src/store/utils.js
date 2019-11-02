export const updateObject = (oldObject, newObject) => ({
  ...oldObject,
  ...newObject
});

export const calculateTotalPrice = (ingredients, INGREDIENT_PRICES) => {
  return Object.keys(ingredients)
    .map(ingredient => ingredients[ingredient] * INGREDIENT_PRICES[ingredient])
    .reduce((acc, el) => {
      return acc + el;
    }, 0);
};
