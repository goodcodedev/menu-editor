import fetch from 'cross-fetch';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export function addCategory(name) {
  return {
    type: ADD_CATEGORY,
    name: name.trim()
  };
}

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export function deleteCategory(categoryId) {
  return {
    type: DELETE_CATEGORY,
    categoryId
  };
}

export const CLEAR_INIT_FORM = 'CLEAR_INIT_FORM';
export function clearInitForm() {
  return {
    type: CLEAR_INIT_FORM
  };
}

export const EDIT_CATEGORY_NAME = 'EDIT_CATEGORY_NAME';
export function editCategoryName(categoryId, name) {
  return {
    type: EDIT_CATEGORY_NAME,
    categoryId,
    name: name.trim()
  };
}

export const REORDER_CATEGORY = 'REORDER_CATEGORY';
export function reorderCategory(categoryId, sourceIdx, destIdx) {
  return {
    type: REORDER_CATEGORY,
    categoryId,
    sourceIdx,
    destIdx
  };
}

export const ADD_DISH = 'ADD_DISH';
export function addDish(categoryId, name, description, price) {
  return {
    type: ADD_DISH,
    categoryId,
    name: name.trim(),
    description: description.trim(),
    price: price.trim()
  };
}

export const DELETE_DISH = 'DELETE_DISH';
export function deleteDish(categoryId, dishId) {
  return {
    type: DELETE_DISH,
    categoryId,
    dishId
  };
}

export const EDIT_DISH_NAME = 'EDIT_DISH_NAME';
export function editDishName(dishId, name) {
  return {
    type: EDIT_DISH_NAME,
    dishId,
    name: name.trim()
  };
}

export const EDIT_DISH_DESCRIPION = 'EDIT_DISH_DESCRIPION';
export function editDishDescription(dishId, description) {
  return {
    type: EDIT_DISH_DESCRIPION,
    dishId,
    description: description.trim()
  };
}

export const EDIT_DISH_PRICE = 'EDIT_DISH_PRICE';
export function editDishPrice(dishId, price) {
  return {
    type: EDIT_DISH_PRICE,
    dishId,
    price: price.trim()
  };
}

export const REORDER_DISH = 'REORDER_DISH';
export function reorderDish(dishId, sourceCat, sourceIdx, destCat, destIdx) {
  return {
    type: REORDER_DISH,
    dishId,
    sourceCat,
    sourceIdx,
    destCat,
    destIdx
  };
}
