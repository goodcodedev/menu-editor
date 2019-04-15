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
  color: #777777;
  text-align: center;
  background-image: linear-gradient(#f5fef3, #d9f9cf);
  background: linear-gradient(rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.3)) top left,
    linear-gradient(177deg,#fff,#b5b5ab) top left;
  border: 1px solid #ada88a;
  border-radius: 3px;

  :hover {
    background: linear-gradient(rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.3)) top left,
      linear-gradient(175deg, #fff,#d2d2c3) top left;
    color: #5f5f5f;
  }
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
