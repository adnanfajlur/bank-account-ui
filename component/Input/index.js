/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import cn from 'classnames'
import theme from '../theme'

const Root = styled.div`
  display: block;
`
const LabelForm = styled.div`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`

const styles = {
  inputForm: css`
    box-sizing: border-box;
    padding: 4px 12px;
    width: 100%;
    height: 42px;
    border: 2px solid ${theme.neutralShade2};
    border-radius: ${theme.borderRadius};
    color: ${theme.foregroundColor};
    background: ${theme.backgroundColor};
    font-size: 13px;
    font-weight: 400;
    &:focus {
      border-color: ${theme.primaryColor};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${theme.neutralShade1};
      opacity: 0.6;
    }
  `,
  textArea: css`
    min-height: 80px;
    resize: none;
  `,
  select: css`
    cursor: pointer;
    > option {
      font-weight: 300;
    }
  `,
  helperForm: css`
    color: ${theme.accent2Color};
  `,
  inputSuccess: css`
    border-color: ${theme.accent1Color};
  `,
  inputError: css`
    border-color: ${theme.accent2Color};
  `,
  inputDefault: css`
    border-color: ${theme.neutralShade2};
  `,
  helperSuccess: css`
    color: ${theme.accent1Color};
  `,
  helperError: css`
    color: ${theme.accent2Color};
  `,
  helperDefault: css`
    color: ${theme.neutralShade2};
  `,
}

const getColor = (name, el = 'input') => {
  switch (name) {
    case 'success':
      return styles[`${el}Success`]
    case 'error':
      return styles[`${el}Error`]
    default:
      return styles[`${el}Default`]
  }
}

const Input = ({
  label, helper, style, minWidth, variant, textarea, select, children, ...args
}) => {
  return (
    <Root style={{ minWidth, ...style }}>
      {label && <LabelForm>{label}</LabelForm>}
      {textarea && (
        <textarea className={cn(styles.inputForm, styles.textArea, getColor(variant, 'input'))} {...args} />
      )}
      {select && (
        <select className={cn(styles.inputForm, styles.select, getColor(variant, 'input'))} {...args}>
          {children}
        </select>
      )}
      {!(textarea || select) && (
        <input className={cn(styles.inputForm, getColor(variant, 'input'))} {...args} />
      )}
      {helper && <p className={cn(styles.helperForm, getColor(variant, 'helper'))}>{helper}</p>}
    </Root>
  )
}

Input.defaultProps = {
  textarea: false,
  select: false,
  minWidth: '280px',
}

Input.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  minWidth: PropTypes.string,
  style: PropTypes.object,
  textarea: PropTypes.bool,
  select: PropTypes.bool,
  children: PropTypes.node,
}

export default Input
