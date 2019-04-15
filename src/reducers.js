import { guid } from './util';
import {
  ADD_CATEGORY,
  EDIT_CATEGORY_NAME,
  ADD_DISH,
  REORDER_DISH,
  DELETE_DISH,
  REORDER_CATEGORY,
  DELETE_CATEGORY,
  EDIT_DISH_NAME,
  EDIT_DISH_DESCRIPION,
  EDIT_DISH_PRICE,
  CLEAR_INIT_FORM
} from './actions';

function makeInitialState() {
  let eggBaconId = guid();
  let clubSandwichId = guid();
  let lunchId = guid();
  let dinnerId = guid();

  let cats = {};
  let dishes = {};

  dishes[eggBaconId] = {
    id: eggBaconId,
    name: 'Egg & Bacon',
    description: 'Ferske egg',
    price: '123'
  };
  dishes[clubSandwichId] = {
    id: clubSandwichId,
    name: 'Club sandwich',
    description: 'Kylling, bacon, majones, ost, tomat, salat og pommes frites',
    price: '198'
  };
  cats[lunchId] = {
    id: lunchId,
    name: 'Lunsj',
    dishes: [eggBaconId, clubSandwichId]
  };
  cats[dinnerId] = {
    id: dinnerId,
    name: 'Middag',
    dishes: []
  };
  return {
    edited: false,
    cats: cats,
    dishes: dishes,
    initAddForm: null,
    catsOrder: [lunchId, dinnerId]
  };
}

function reducer(state, action) {
  if (typeof state === 'undefined') {
    state = makeInitialState();
  }
  switch (action.type) {
    case ADD_CATEGORY:
      let newGuid = guid();
      state.cats[newGuid] = {
        id: newGuid,
        name: action.name,
        dishes: []
      };
      state.catsOrder.push(newGuid);
      return {
        ...state,
        cats: { ...state.cats },
        edited: true,
        initAddForm: newGuid
      };
    case CLEAR_INIT_FORM:
      return { ...state, initAddForm: null };
    case EDIT_CATEGORY_NAME:
      state.cats[action.categoryId].name = action.name;
      return { ...state, cats: { ...state.cats } };
    case REORDER_CATEGORY:
      state.catsOrder.splice(action.sourceIdx, 1);
      state.catsOrder.splice(action.destIdx, 0, action.categoryId);
      return { ...state, edited: true };
    case DELETE_CATEGORY:
      // Delete dishes
      state.cats[action.categoryId].dishes.forEach(dishId => {
        delete state.dishes[dishId];
      });
      // Remove from catsOrder
      const catsOrderIdx = state.catsOrder.findIndex(
        x => x === action.categoryId
      );
      state.catsOrder.splice(catsOrderIdx, 1);
      // Finally category data
      delete state.cats[action.categoryId];
      return {
        ...state,
        cats: { ...state.cats },
        dishes: { ...state.dishes },
        catsOrder: [...state.catsOrder],
        edited: true
      };
    case REORDER_DISH:
      state.cats[action.sourceCat].dishes.splice(action.sourceIdx, 1);
      state.cats[action.destCat].dishes.splice(
        action.destIdx,
        0,
        action.dishId
      );
      return { ...state, edited: true };
    case ADD_DISH:
      let newDish = {
        id: guid(),
        name: action.name,
        description: action.description,
        price: action.price
      };
      state.dishes[newDish.id] = newDish;
      state.cats[action.categoryId].dishes = [
        ...state.cats[action.categoryId].dishes,
        newDish.id
      ];
      return {
        ...state,
        dishes: { ...state.dishes },
        cats: { ...state.cats },
        edited: true,
        initAddForm: action.categoryId
      };
    case EDIT_DISH_NAME:
      state.dishes[action.dishId].name = action.name;
      return { ...state, dishes: { ...state.dishes } };
    case EDIT_DISH_DESCRIPION:
      state.dishes[action.dishId].description = action.description;
      return { ...state, dishes: { ...state.dishes } };
    case EDIT_DISH_PRICE:
      state.dishes[action.dishId].price = action.price;
      return { ...state, dishes: { ...state.dishes } };
    case DELETE_DISH:
      let idx = state.cats[action.categoryId].dishes.findIndex(
        x => x.id === action.dishId
      );
      state.cats[action.categoryId].dishes.splice(idx, 1);
      delete state.dishes[action.dishId];
      return {
        ...state,
        cats: { ...state.cats },
        dishes: { ...state.dishes },
        edited: true
      };
    default:
      return state;
  }
}

export default reducer;
