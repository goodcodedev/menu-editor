import React, { useState, useCallback, useEffect } from 'react';
import DishEntry from './DishEntry';
import { connect } from 'react-redux';
import { addDish, deleteDish, clearInitForm } from './actions';
import styled from 'styled-components';
import AddEntryForm from './AddEntryForm';

const AddEntryRow = styled.div`
  height: 55px;
  cursor: pointer;
  font-size: 40px;
  text-align: center;
  background: linear-gradient(#f5fef3, #d9f9cf);
  border: 1px solid #dee4db;
`;

function DishesList({
  categoryId,
  dishesList,
  deleteDish,
  innerRef,
  placeholder,
  initAddForm,
  clearInitForm
}) {
  let [showAddForm, setShowAddForm] = useState(initAddForm);
  useEffect(() => {
    if (initAddForm) {
      clearInitForm(categoryId);
    }
  }, [initAddForm]);

  let deleteDishClick = useCallback(
    dishId => {
      deleteDish(dishId);
    },
    [categoryId]
  );
  return (
    <div ref={innerRef}>
      {dishesList.map((dish, idx) => (
        <DishEntry
          key={dish}
          dishId={dish}
          index={idx}
          deleteDishClick={deleteDishClick}
        />
      ))}
      {placeholder}
      {showAddForm ? (
        <AddEntryForm
          categoryId={categoryId}
          initAddForm={initAddForm}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <AddEntryRow onClick={() => setShowAddForm(true)}>+</AddEntryRow>
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    dishesList: state.cats[ownProps.categoryId].dishes,
    initAddForm: state.initAddForm === ownProps.categoryId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDish: (name, description, price) => {
      dispatch(addDish(ownProps.categoryId, name, description, price));
    },
    deleteDish: dishId => {
      dispatch(deleteDish(ownProps.categoryId, dishId));
    },
    clearInitForm: () => {
      dispatch(clearInitForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishesList);
