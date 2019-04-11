import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DishesList from './DishesList';
import EditTextInput from './EditTextInput';
import {
  addCategory,
  reorderDish,
  reorderCategory,
  deleteCategory,
  editCategoryName
} from './actions';
import AddCategoryForm from './AddCategoryForm';
import styled from 'styled-components';

const MenuContainer = styled.div`
  width: 550px;
`;

const CategoryHeader = styled.div`
  text-transform: uppercase;
  border-bottom: 1px solid #cecece;
  color: #2b5075;
  font-size: 22px;
  margin: 22px 0 22px 12px;

  h3 {
    margin: 0;
    font-size: 22px;
  }

  input {
    font-size: 22px;
  }
`;

const AddCategoryIcon = styled.img`
  width: 80px;
  margin: 10px 0 0 12px;
  cursor: pointer;
`;

const EntryIcon = styled.img`
  opacity: 1;
  margin-left: 2px;
`;

function MenuList({
  cats,
  catsOrder,
  reorderDish,
  reorderCategory,
  deleteCategory,
  editCategoryName
}) {
  let [showAddForm, setShowAddForm] = useState(false);
  // todo: probably CategoryEntry would be nice
  let [toggleEditName, setEditName] = useState(null);
  let onNameChange = useCallback((categoryId, newValue) => {
    editCategoryName(categoryId, newValue);
    setEditName(false);
  }, []);
  let onDragEnd = useCallback(result => {
    const { destination, source, draggableId, type } = result;
    if (destination === null) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    switch (type) {
      case 'menu-items':
        reorderDish(
          draggableId,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        );
        break;
      case 'categories':
        reorderCategory(draggableId, source.index, destination.index);
        break;
      default:
        break;
    }
  });
  let deleteCategoryClick = useCallback(categoryId => {
    deleteCategory(categoryId);
  }, []);
  return (
    <MenuContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-cats" type="categories">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {catsOrder.map((catId, idx) => {
                let cat = cats[catId];
                return (
                  <Draggable key={catId} draggableId={catId} index={idx}>
                    {provided => (
                      <div
                        key={catId}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <CategoryHeader>
                          {toggleEditName === catId ? (
                            <EditTextInput
                              className="category-new-name"
                              init={cat.name}
                              style={{ fontSize: 22 }}
                              onBlur={newName => onNameChange(catId, newName)}
                            />
                          ) : (
                            <h3
                              onClick={() => setEditName(catId)}
                            >
                              {cat.name !== '' ? (
                                cat.name
                              ) : (
                                <span style={{ color: '#b2beca' }}>
                                  Mangler tittel
                                </span>
                              )}
                              <EntryIcon
                                src="icons/delete.svg"
                                alt="Slett"
                                width="14"
                                onClick={() => deleteCategoryClick(catId)}
                              />{' '}
                              <EntryIcon
                                src="icons/drag-up-down.svg"
                                alt="Flytt"
                                width="14"
                                {...provided.dragHandleProps}
                              />
                            </h3>
                          )}
                        </CategoryHeader>
                        <Droppable droppableId={catId} type="menu-items">
                          {provided => (
                            <DishesList
                              categoryId={catId}
                              innerRef={provided.innerRef}
                              placeholder={provided.placeholder}
                              {...provided.droppableProps}
                            />
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showAddForm ? (
        <AddCategoryForm onDone={() => setShowAddForm(false)} />
      ) : (
        <AddCategoryIcon
          src="icons/add-folder.svg"
          onClick={() => setShowAddForm(true)}
          alt="Ny kategori"
        />
      )}
    </MenuContainer>
  );
}

const mapStateToProps = state => {
  return {
    cats: state.cats,
    catsOrder: state.catsOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCategory: name => {
      dispatch(addCategory(name));
    },
    reorderDish: (dishId, sourceCat, sourceIdx, destCat, destIdx) => {
      dispatch(reorderDish(dishId, sourceCat, sourceIdx, destCat, destIdx));
    },
    reorderCategory: (categoryId, sourceIdx, destIdx) => {
      dispatch(reorderCategory(categoryId, sourceIdx, destIdx));
    },
    deleteCategory: categoryId => {
      dispatch(deleteCategory(categoryId));
    },
    editCategoryName: (categoryId, newName) => {
      dispatch(editCategoryName(categoryId, newName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList);
