/* eslint-disable arrow-body-style */
/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import cn from 'classnames'
import theme from '../theme'

const styles = {
  root: css`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    text-align: center;
    border: none;
    padding: 8px 18px;
    cursor: pointer;
    border-radius: ${theme.borderRadius};
    background: ${theme.primaryColor};
    color: #fefefe;
    min-width: 64px;
    &:disabled {
      cursor: unset;
      background: ${theme.neutralShade2};
    }
    &:hover:not([disabled]) {
      background: ${theme.primaryShade1};
    }
    &:focus:not([disabled]) {
      background: ${theme.primaryShade2};
    }
  `,
  small: css`
    font-size: 0.8125rem;
    padding: 4px 8px;
  `,
  medium: css`
    font-size: 0.875rem;
    padding: 6px 16px;
  `,
  large: css`
    font-size: 0.9375rem;
    padding: 8px 24px;
    font-weight: 600;
  `,
  loading: css`
    width: 17px;
    height: 17px;
    margin-right: 8px;
  `,
}

const getSize = (name) => {
  switch (name) {
    case 'sm':
      return styles.small
    case 'md':
      return styles.medium
    case 'lg':
      return styles.large
    default:
      return styles.medium
  }
}

const Button = ({
  variant, size, children, loading, ...args
}) => {
  return (
    <button
      disabled={loading}
      {...args}
      className={cn(
        styles.root,
        getSize(size),
      )}
    >
      {loading && <img src="/static/svg/loading.svg" alt="loading" className={styles.loading} />}
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'default',
  size: 'md',
  loading: false,
}

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
}

export default Button
