/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { styled } from 'linaria/react'
import { Formik } from 'formik'
import Input from '../Input'
import Button from '../Button'
import AutoComplete from '../AutoComplete'
import theme from '../theme'
import validationSchema from './validationSchema'

const Root = styled.div`
  width: 100%
`
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 48px;
  font-weight: 500;
  background: ${theme.primaryColor};
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
  margin-right: -18px;
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
const ButtonActionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 8px 0 16px -12px;
`

const initialValues = {
  type: '',
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

  handleSubmit = async (values, { setSubmitting }) => {
    await this.props.onSubmit(values)
    setSubmitting(false)
  }

  render() {
    const { dataUpdate } = this.props
    return (
      <Root>
        <Head>Create Account</Head>
        <Body>
          <Formik
            initialValues={dataUpdate || initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({
              values, handleChange, handleSubmit, isSubmitting, handleBlur, errors, touched,
            }) => (
              <FormWrapper onSubmit={handleSubmit}>
                <Wrapper>
                  <Input
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    variant={touched.type && errors.type && 'error'}
                    helper={touched.type && errors.type}
                    onBlur={handleBlur}
                    label="Type*"
                    select
                  >
                    <option value="">None</option>
                    <option value="company">Company</option>
                    <option value="individual">Individual</option>
                  </Input>
                </Wrapper>
                {values.type === 'company' && (
                  <Wrapper>
                    <Input
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      variant={touched.companyName && errors.companyName && 'error'}
                      helper={touched.companyName && errors.companyName}
                      onBlur={handleBlur}
                      label="Company Name*"
                    />
                  </Wrapper>
                )}
                {values.type === 'individual' && (
                  <Wrapper>
                    <Input
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      variant={touched.firstName && errors.firstName && 'error'}
                      helper={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      label="First Name*"
                    />
                    <Input
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      variant={touched.lastName && errors.lastName && 'error'}
                      helper={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      label="Last Name"
                    />
                  </Wrapper>
                )}
                <Wrapper>
                  <Input
                    name="accountHolderName"
                    value={values.accountHolderName}
                    onChange={handleChange}
                    variant={touched.accountHolderName && errors.accountHolderName && 'error'}
                    helper={touched.accountHolderName && errors.accountHolderName}
                    onBlur={handleBlur}
                    label="Account Holder Name*"
                  />
                  <Input
                    name="accountNumber"
                    value={values.accountNumber}
                    onChange={handleChange}
                    variant={touched.accountNumber && errors.accountNumber && 'error'}
                    helper={touched.accountNumber && errors.accountNumber}
                    onBlur={handleBlur}
                    label="Account Number*"
                  />
                  <Input
                    name="swiftCode"
                    value={values.swiftCode}
                    onChange={handleChange}
                    variant={touched.swiftCode && errors.swiftCode && 'error'}
                    helper={touched.swiftCode && errors.swiftCode}
                    onBlur={handleBlur}
                    label="Swift Code*"
                  />
                  <AutoComplete
                    name="currency"
                    value={values.currency}
                    onChange={handleChange}
                    variant={touched.currency && errors.currency && 'error'}
                    helper={touched.currency && errors.currency}
                    onBlur={handleBlur}
                    label="Currency*"
                    minWidth="260px"
                    url="https://restcountries.eu/rest/v2/all"
                    dataConfig={this.handleDataConfig}
                  />
                </Wrapper>
                <Wrapper>
                  <Input
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    variant={touched.address && errors.address && 'error'}
                    helper={touched.address && errors.address}
                    onBlur={handleBlur}
                    label="Address*"
                    textarea
                  />
                  <Input
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    variant={touched.city && errors.city && 'error'}
                    helper={touched.city && errors.city}
                    onBlur={handleBlur}
                    label="City*"
                  />
                  <Input
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    variant={touched.country && errors.country && 'error'}
                    helper={touched.country && errors.country}
                    onBlur={handleBlur}
                    label="Country*"
                  />
                </Wrapper>
                <ButtonActionWrapper>
                  <Button size="lg" type="submit" loading={isSubmitting}>Submit</Button>
                </ButtonActionWrapper>
              </FormWrapper>
            )}
          </Formik>
        </Body>
      </Root>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  dataUpdate: PropTypes.any,
}

export default Form
