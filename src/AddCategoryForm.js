import React, { useState, useCallback, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addCategory } from './actions';

const AddCategoryContainer = styled.div`
  margin-top: 12px;
  padding: 12px;
  padding-bottom: 15px;
  background: linear-gradient(175deg, #d1f3fd,#3a526d);
  background: linear-gradient(rgba(249, 249, 249, 0.8),
    rgba(249, 249, 249, 0.1) 16%,
    rgba(249, 249, 249, 0.1) 20%,
    rgba(249, 249, 249, 0.3) 80%,
    rgba(230, 230, 230, 0.3)) top left,
    linear-gradient(175deg, #d1f3fd,#3a526d) top left;
  border: 1px solid #ab93a4;
  border-radius: 3px;
`;

const AddCategoryInput = styled.input`
  font-size: 22px;
`;

const AddCategoryButton = styled.button``;

const FormHeader = styled.h3`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  margin: 0 0 5px 0;
`;

function AddCategoryForm({ addCategory, onDone }) {
  let [newCatName, setNewCatName] = useState('');
  let addCategoryClick = useCallback(() => {
    addCategory(newCatName);
    setNewCatName('');
    onDone();
  }, [newCatName]);
  let ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return (
    <AddCategoryContainer>
      <FormHeader>Legg til kategori</FormHeader>
      <div>
        <AddCategoryInput
          ref={ref}
          type="text"
          placeholder="Kategori"
          value={newCatName}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addCategoryClick();
            }
          }}
          onChange={e => {
            setNewCatName(e.target.value);
          }}
          onBlur={e => {
            if (newCatName === '') {
              // Cancelling on blurring empty
              onDone();
            }
          }}
        />
      </div>
      <div>
        <AddCategoryButton onClick={addCategoryClick}>
          Legg til kategori
        </AddCategoryButton>
      </div>
    </AddCategoryContainer>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addCategory: name => {
      dispatch(addCategory(name));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddCategoryForm);
