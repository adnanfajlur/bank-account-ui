import React, { Component } from 'react'
import { styled } from 'linaria/react'
import { Formik } from 'formik'
import Input from '../Input'
import AutoComplete from '../AutoComplete'

const Root = styled.div`
  width: 100%
`
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 64px;
  background: #49beb7;
  color: #fefefe;
  border-radius: 8px 8px 0px 0px;
  padding: 0 32px;
`
const Body = styled.div`
  background: #fefefe;
  min-height: 320px;
  padding: 12px 32px;
`
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  > div {
    margin-bottom: 24px;
    width: calc((100% - 54px) / 3);
    margin-right: 18px;
  }
`

const initialValues = {
  type: 'company',
  companyName: '',
  firstName: '',
  lastName: '',
  accountHolderName: '',
  accountNumber: '',
  swiftCode: '',
  address: '',
  city: '',
  country: '',
  currency: '',
}

class Form extends Component {
  handleDataConfig = (data) => {
    const allData = data.map(n => n.currencies).flat()
    const mapData = allData.map(n => ({ value: n.code, label: `${n.name} - ${n.symbol || ''}` }))
    const sortedData = mapData.sort((x, y) => x.label - y.label)
    return sortedData
  }

  render() {
    return (
      <Root>
        <Head>Create Account</Head>
        <Body>
          <Formik initialValues={initialValues}>
            {({ values, handleChange }) => (
              <FormWrapper>
                <Wrapper>
                  <Input name="type" value={values.type} onChange={handleChange} label="Type" select>
                    <option value="company">Company</option>
                    <option value="individual">Individual</option>
                  </Input>
                </Wrapper>
                {values.type === 'company' && (
                  <Wrapper>
                    <Input name="companyName" value={values.companyName} onChange={handleChange} label="Company Name" />
                  </Wrapper>
                )}
                {values.type === 'individual' && (
                  <Wrapper>
                    <Input name="firstName" value={values.firstName} onChange={handleChange} label="First Name" />
                    <Input name="lastName" value={values.lastName} onChange={handleChange} label="Last Name" />
                  </Wrapper>
                )}
                <Wrapper>
                  <Input name="accountHolderName" value={values.accountHolderName} onChange={handleChange} label="Account Holder Name" minWidth="260px" />
                  <Input name="accountNumber" value={values.accountNumber} onChange={handleChange} label="Account Number" minWidth="260px" />
                  <Input name="swiftCode" value={values.swiftCode} onChange={handleChange} label="Swift Code" minWidth="260px" />
                  <AutoComplete
                    name="currency"
                    value={values.currency}
                    onChange={handleChange}
                    label="Currency"
                    minWidth="260px"
                    url="https://restcountries.eu/rest/v2/all"
                    dataConfig={this.handleDataConfig}
                  />
                </Wrapper>
                <Wrapper>
                  <Input name="address" value={values.address} onChange={handleChange} label="Address" />
                  <Input name="city" value={values.city} onChange={handleChange} label="City" />
                  <Input name="country" value={values.country} onChange={handleChange} label="Country" />
                </Wrapper>
              </FormWrapper>
            )}
          </Formik>
        </Body>
      </Root>
    )
  }
}

export default Form
