import React, { useState, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditTextInput from './EditTextInput';
import { connect } from 'react-redux';
import { editDishName, editDishDescription, editDishPrice } from './actions';
import styled from 'styled-components';

const DishContainer = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  padding-bottom: 16px;
  background: linear-gradient(#f2f5ff, #fff 80%, #fff);
  border: 1px solid #e7eaf3;
  border-radius: 2px;
`;

const EntryIcon = styled.img`
    opacity: 1;
    margin-left: 2px;
`;

const DishHeader = styled.h3`
  font-size: 16px;
  margin: 0;
  color: ${props => (props.isEmpty ? '#e45c5c' : 'inherit')};
`;

const DishDescription = styled.p`
  margin: 5px 0;
  color: ${props => (props.isEmpty ? '#bac0d0' : 'inherit')};
`;

const DishPrice = styled.div`
  font-size: 25px;
  text-align: right;
  color: ${props => (props.isEmpty ? '#bac0d0' : 'inherit')};
`;

function DishEntry({
  dishId,
  dish,
  editName,
  editDescription,
  editPrice,
  index,
  deleteDishClick
}) {
  let [toggleEditPrice, setEditPrice] = useState(false);
  let [toggleEditDescription, setEditDescription] = useState(false);
  let [toggleEditName, setEditName] = useState(false);

  let onPriceChange = useCallback(newValue => {
    editPrice(newValue);
    setEditPrice(false);
  }, []);

  let onDescriptionChange = useCallback(newValue => {
    editDescription(newValue);
    setEditDescription(false);
  }, []);

  let onNameChange = useCallback(newValue => {
    editName(newValue);
    setEditName(false);
  }, []);
  return (
    <Draggable draggableId={dishId} index={index}>
      {provided => (
        <DishContainer ref={provided.innerRef} {...provided.draggableProps}>
          <div style={{ flexGrow: 1 }}>
            {toggleEditName ? (
              <EditTextInput
                className="menu-dish-new-name"
                init={dish.name}
                style={{ fontSize: 16 }}
                onBlur={onNameChange}
              />
            ) : (
              <DishHeader
                isEmpty={dish.name === ''}
                onClick={() => setEditName(true)}
              >
                {dish.name === '' ? 'Mangler tittel' : dish.name}{' '}
                <EntryIcon
                  src="icons/delete.svg"
                  alt="Slett"
                  width="14"
                  onClick={() => deleteDishClick(dish.id)}
                />{' '}
                <EntryIcon
                  src="icons/drag-up-down.svg"
                  alt="Flytt"
                  width="14"
                  {...provided.dragHandleProps}
                />
              </DishHeader>
            )}{' '}
            {toggleEditDescription ? (
              <EditTextInput
                className="menu-dish-new-description"
                init={dish.description}
                style={{ width: '96%', fontSize: 16, margin: '5px 0' }}
                onBlur={onDescriptionChange}
              />
            ) : (
              <DishDescription isEmpty={dish.description === ''} onClick={() => setEditDescription(true)}>
                {dish.description === ''
                  ? 'Ingen beskrivelse'
                  : dish.description}
              </DishDescription>
            )}
          </div>
          {toggleEditPrice ? (
            <EditTextInput
              className="menu-dish-new-price"
              size="2"
              style={{ fontSize: 25, textAlign: 'right' }}
              init={dish.price}
              onBlur={onPriceChange}
              selectAll={true}
            />
          ) : (
            <DishPrice isEmpty={dish.price === ''} onClick={() => setEditPrice(true)}>
              {dish.price === '' ? 'Tom' : (dish.price + ',-')}
            </DishPrice>
          )}
        </DishContainer>
      )}
    </Draggable>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    dish: state.dishes[ownProps.dishId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editName: name => {
      dispatch(editDishName(ownProps.dishId, name));
    },
    editDescription: description => {
      dispatch(editDishDescription(ownProps.dishId, description));
    },
    editPrice: price => {
      dispatch(editDishPrice(ownProps.dishId, price));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishEntry);
