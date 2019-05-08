/* eslint-disable arrow-body-style */
import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'linaria/react'

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 64px;
  background: #49beb7;
  color: #fefefe;
  border-radius: 8px;
  padding: 0 32px;
`
const ButtonIcon = styled.i`
  padding: 12px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
    background: #3ca9a3;
  }
`

const Header = ({ onChange }) => {
  return (
    <Root>
      <ButtonIcon onClick={() => onChange('form')}>add</ButtonIcon>
      <ButtonIcon onClick={() => onChange('table')}>table_chart</ButtonIcon>
    </Root>
  )
}

Header.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Header
