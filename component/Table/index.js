import React, { Component } from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'

const THead = styled.thead`
  font-weight: 500;
  > tr {
    background: #49beb7;
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
    border-bottom: 1px solid #ebefd0;
    &:hover {
      background: #ebefd0;
    }
    > td {
      padding: 12px 16px;
      text-align: start;
    }
  }
`

class Tables extends Component {
  render() {
    const { config, data, ...args } = this.props
    return (
      <table {...args}>
        <THead>
          <tr>
            {config.map((item, key) => (
              <th key={key}>{item.title}</th>
            ))}
          </tr>
        </THead>
        <TBody>
          {Array.isArray(data) && data.map((item, key) => (
            <tr key={key}>
              {config.map((item1, key1) => (
                <td key={key1}>{item[item1.key]}</td>
              ))}
            </tr>
          ))}
        </TBody>
      </table>
    )
  }
}

Tables.propTypes = {
  config: PropTypes.array.isRequired,
  data: PropTypes.array,
}

Tables.defaultProps = {
  data: null,
}

export default Tables
