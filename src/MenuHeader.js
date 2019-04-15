import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const MenuHeaderContainer = styled.div`
  width: 550px;
  height: 42px;
  background: linear-gradient(rgb(164, 164, 212),rgb(66, 66, 132));
  background: rgb(84, 84, 148);
  text-align: right;
  padding: 8px 8px 8px 12px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
`;

const MenuHeaderTitle = styled.h3`
    margin: 0;
    color: rgba(255,255,255,0.9);
    font-weight: normal;
    font-size: 15px;
`;

function MenuHeader({ edited }) {
  return (
    <MenuHeaderContainer>
      <div>
        <MenuHeaderTitle>Meny editor</MenuHeaderTitle>
      </div>
      <div>
        <button disabled={!edited}>Lagre</button>
      </div>
    </MenuHeaderContainer>
  );
}

const mapStateToProps = state => {
  return {
    edited: state.edited
  };
};

export default connect(mapStateToProps)(MenuHeader);
