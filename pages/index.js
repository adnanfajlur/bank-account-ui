/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { styled } from 'linaria/react'
import faker from 'faker'
import Table from '../component/Table'
import Header from '../component/Header'
import Form from '../component/Form'

const Root = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #ececec;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1120px;
  margin-top: 24px;
`
const TableCard = styled.div`
  background: #fefefe;
  margin: 12px 32px;
  border-radius: 8px 8px 0px 0px;
  overflow: auto;
  color: #494949;
`
const HeaderCard = styled.div`
  margin: 12px 32px;
`
const FormCard = styled.div`
  margin: 12px 32px;
`

const configTable = [
  { key: 'accountHolderName', title: 'Holder Name' },
  { key: 'accountNumber', title: 'Number' },
  { key: 'swiftCode', title: 'Swift Code' },
  { key: 'address', title: 'Address' },
  { key: 'city', title: 'City' },
  { key: 'country', title: 'Country' },
  { key: 'type', title: 'Type' },
]

const initData = length => Array.from(Array(length).keys()).map(() => ({
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
      loading: false,
      section: 'form',
    }
  }

  componentDidMount() {
    const data = JSON.parse(window.localStorage.getItem('data'))
    if (Array.isArray(data)) {
      this.setState({ data })
    } else {
      this.setState({ data: initData(10) })
    }
  }

  componentWillUnmount() {
    window.localStorage.setItem('data', this.state.data)
  }

  render() {
    const { data, loading, section } = this.state
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
                data={data}
              />
            </TableCard>
          )}
          {section === 'form' && (
            <FormCard>
              <Form />
            </FormCard>
          )}
        </Container>
      </Root>
    )
  }
}

export default Home
