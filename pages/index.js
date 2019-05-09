/* eslint-disable no-useless-return */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { styled } from 'linaria/react'
import faker from 'faker'
import Table from '../component/Table'
import Header from '../component/Header'
import Form from '../component/Form'
import theme from '../component/theme'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Root = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: #ececec;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1120px;
  margin: 24px 0;
`
const TableCard = styled.div`
  background: #fefefe;
  margin: 12px 32px;
  border-radius: 8px 8px 0px 0px;
  overflow: auto;
  color: #494949;
  &::-webkit-scrollbar-track {
    background: inherit;
  }
  &::-webkit-scrollbar {
    height: 22px;
    background: inherit;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0px 9px 0px 0px ${theme.primaryShade2};
    border: solid 6px transparent;
}
  }
`
const HeaderCard = styled.div`
  margin: 12px 32px;
`
const FormCard = styled.div`
  margin: 12px 32px;
`

const configTable = [
  { key: 'cardName', title: 'Card Name' },
  { key: 'accountHolderName', title: 'Holder Name' },
  { key: 'accountNumber', title: 'Number' },
  { key: 'swiftCode', title: 'Swift Code' },
  { key: 'address', title: 'Address' },
  { key: 'city', title: 'City' },
  { key: 'country', title: 'Country' },
  { key: 'type', title: 'Type' },
]

const initData = length => Array.from(Array(length).keys()).map(() => ({
  companyName: faker.company.companyName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  accountHolderName: faker.finance.accountName(),
  accountNumber: faker.random.number(),
  swiftCode: faker.address.countryCode(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  type: faker.random.arrayElement(['individual', 'company']),
}))

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      section: 'table',
      dataUpdate: null,
    }
  }

  componentDidMount() {
    try {
      const data = JSON.parse(window.localStorage.getItem('data'))
      if (!Array.isArray(data)) throw new Error('Data Not Found')
      this.handleChangeData({ data })
    } catch (err) {
      this.handleChangeData({ data: initData(3) })
      console.log(`ERROR => ${err.message}`)
    }
  }

  handleChangeData = ({ data }) => {
    this.setState({ data }, () => {
      window.localStorage.setItem('data', JSON.stringify(data))
    })
  }

  handleSubmit = async (values) => {
    const { data, dataUpdate } = this.state
    this.setState({ section: 'table', dataUpdate: null })
    if (dataUpdate) {
      const updatedData = data
      updatedData[dataUpdate] = values
      this.handleChangeData({ data: updatedData })
    } else {
      this.handleChangeData({ data: [...data, values] })
    }
    await sleep(1000)
    return
  }

  handleUpdate = (key) => {
    this.setState({ dataUpdate: key, section: 'form' })
  }

  handleDelete = (key) => {
    const { data } = this.state
    console.log('snp', key)
    this.handleChangeData({ data: data.filter((n, index) => index !== key) })
  }

  handleMappingData = (data) => {
    if (!Array.isArray(data)) return null
    return data.map(n => ({
      ...n,
      cardName: n.type === 'individual' ? `${n.firstName} ${n.lastName}` : n.companyName,
    }))
  }

  render() {
    const { data, section, dataUpdate } = this.state
    return (
      <Root>
        <Container>
          <HeaderCard>
            <Header onChange={e => this.setState({ section: e })}>tes</Header>
          </HeaderCard>
          {section === 'table' && (
            <TableCard>
              <Table
                config={configTable}
                data={this.handleMappingData(data)}
                triggerUpdate={this.handleUpdate}
                triggerDelete={this.handleDelete}
              />
            </TableCard>
          )}
          {section === 'form' && (
            <FormCard>
              <Form
                onSubmit={this.handleSubmit}
                dataUpdate={data[dataUpdate]}
              />
            </FormCard>
          )}
        </Container>
      </Root>
    )
  }
}

export default Home
