/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'

class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.handleFetchData()
  }

  handleFetchData = async () => {
    this.setState({ loading: true })
    let count = 0
    try {
      const fetchUrl = await fetch(this.props.url)
      const data = await fetchUrl.json()
      this.setState({ options: data, loading: false })
      count += 1
    } catch (err) {
      if (count < 7) {
        this.handleFetchData()
      }
      this.setState({ loading: false })
    }
  }

  render() {
    const { dataConfig, ...args } = this.props
    const { options, loading } = this.state
    return (
      <Input {...args} select>
        {loading && <option>Loading...</option>}
        {!loading && !options && <option>Data not found</option>}
        {!loading && options && dataConfig(options).map((item, key) => (
          <option value={item.value} key={key}>{item.label}</option>
        ))}
      </Input>
    )
  }
}

AutoComplete.propTypes = {
  url: PropTypes.string.isRequired,
  dataConfig: PropTypes.func.isRequired,
}

export default AutoComplete
