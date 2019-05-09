import React, { Component } from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import theme from '../theme'

const TableWrapper = styled.table`
  min-width: 1280px;
`
const THead = styled.thead`
  font-weight: 500;
  > tr {
    background: ${theme.primaryColor};
    color: #fefefe;
    > th {
      padding: 16px;
      text-align: start;
      min-width: 86px;
    }
  }
`
const TBody = styled.tbody`
  font-size: .88rem;
  > tr {
    border-bottom: 1px solid #f3f8ff;
    &:hover {
      background: #f3f8ff;
    }
    > td {
      padding: 12px 16px;
      text-align: start;
    }
  }
`
const ActionButton = styled.i`
  padding: 8px;
  border-radius: 50px;
  font-size: 20px;
  color: #fefefe;
  background: ${theme.primaryColor};
  &:hover {
    cursor: pointer;
    background: ${theme.primaryShade1};
  }
`
const ActionWrapper = styled.td`
  display: flex;
  > * {
    margin-right: 8px;
  }
`

class Tables extends Component {
  render() {
    const {
      config, data, triggerUpdate, triggerDelete, ...args
    } = this.props
    return (
      <TableWrapper {...args}>
        <THead>
          <tr>
            {config.map((item, key) => (
              <th key={key}>{item.title}</th>
            ))}
            <th>Action</th>
          </tr>
        </THead>
        <TBody>
          {Array.isArray(data) && data.map((item, key) => (
            <tr key={key}>
              {config.map((item1, key1) => (
                <td key={key1}>{item[item1.key]}</td>
              ))}
              <ActionWrapper>
                <ActionButton onClick={() => triggerUpdate(key)}>edit</ActionButton>
                <ActionButton onClick={() => triggerDelete(key)}>delete</ActionButton>
              </ActionWrapper>
            </tr>
          ))}
          {!(data && data.length) && (
            <tr>
              <td colSpan={config.length + 1}>Data not found!</td>
            </tr>
          )}
        </TBody>
      </TableWrapper>
    )
  }
}

Tables.propTypes = {
  config: PropTypes.array.isRequired,
  data: PropTypes.array,
  triggerUpdate: PropTypes.func.isRequired,
  triggerDelete: PropTypes.func.isRequired,
}

Tables.defaultProps = {
  data: null,
}

export default Tables
