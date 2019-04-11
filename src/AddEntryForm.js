import React, { useState, useRef, useEffect, useCallback } from 'react';
import { addDish } from './actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ensureInView } from './util';

const FormContainer = styled.div`
  padding: 12px;
  background: linear-gradient(#cbf9bc, #86b37c);
  border: 1px solid #dee4db;
`;

const FormHeader = styled.h3`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const ElementContainer = styled.div`
  margin-bottom: 8px;
`;

function AddEntryForm({ categoryId, addDish, initAddForm, onCancel }) {
  let [newDishName, setNewDishName] = useState('');
  let [newDescription, setNewDescription] = useState('');
  let [newPrice, setNewPrice] = useState('');
  let addDishClick = useCallback(() => {
    addDish(newDishName, newDescription, newPrice);
    setNewDishName('');
    setNewDescription('');
    setNewPrice('');
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [newDishName, newDescription, newPrice, categoryId]);

  let blurred = useCallback(() => {
    if (newDishName === '' && newDescription === '' && newPrice === '') {
      onCancel();
    }
  }, [newDishName, newDescription, newPrice]);

  let titleRef = useRef();
  let containerRef = useRef();
  // For mount effect
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
    if (containerRef.current) {
      ensureInView(containerRef.current);
    }
  }, []);
  useEffect(() => {
    if (initAddForm && containerRef.current) {
      ensureInView(containerRef.current);
    }
  }, [initAddForm]);
  return (
    <FormContainer ref={containerRef}>
      <FormHeader>Legg til rett</FormHeader>
      <ElementContainer>
        <input
          ref={titleRef}
          type="text"
          style={{ fontSize: 20 }}
          value={newDishName}
          placeholder="Tittel"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addDishClick();
            }
          }}
          onChange={e => {
            setNewDishName(e.target.value);
          }}
          onBlur={blurred}
        />
      </ElementContainer>
      <ElementContainer>
        <input
          type="text"
          value={newDescription}
          placeholder="Beskrivelse"
          style={{ width: '100%', fontSize: 16 }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addDishClick();
            }
          }}
          onChange={e => {
            setNewDescription(e.target.value);
          }}
          onBlur={blurred}
        />
      </ElementContainer>
      <ElementContainer>
        <input
          type="text"
          value={newPrice}
          placeholder="Pris"
          size="4"
          style={{ fontSize: 20 }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addDishClick();
            }
          }}
          onChange={e => {
            setNewPrice(e.target.value);
          }}
          onBlur={blurred}
        />
      </ElementContainer>
      <button onClick={addDishClick}>Legg til rett</button>
      <button onClick={() => onCancel()}>Avbryt</button>
    </FormContainer>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDish: (name, description, price) => {
      dispatch(addDish(ownProps.categoryId, name, description, price));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddEntryForm);
