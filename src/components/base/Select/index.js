import styled from '@emotion/styled'
import propTypes from 'prop-types'

const Wrapper = styled.div`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
`

const Label = styled.label`
  display: none;
  font-size: 16px;
  color: #743737;
  margin-bottom: 5px;
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 4px 6px;
  border: 2px solid ${({ invalid }) => (invalid ? 'red' : '#743737')};
  border-radius: 4px;
  box-sizing: border-box;
`

const Select = ({
  data,
  label,
  placeholder,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  wrapperProps,
  ...props
}) => {
  const formattedData = data.map((item) =>
    typeof item === 'string' ? { label: item, value: item } : item
  )

  const options = formattedData.map((item) => (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ))

  if (placeholder) {
    options.unshift(
      <option key="placeholder" value="" hidden>
        {placeholder}
      </option>
    )
  }

  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledSelect invalid={invalid} required={required} disabled={disabled} {...props}>
        {options}
      </StyledSelect>
    </Wrapper>
  )
}

Select.propTypes = {
  data: propTypes.arrayOf(
    propTypes.oneOfType([
      propTypes.string,
      propTypes.shape({
        label: propTypes.string,
        value: propTypes.string,
      }),
    ])
  ),
  label: propTypes.string,
  placeholder: propTypes.string,
  block: propTypes.bool,
  invalid: propTypes.bool,
  required: propTypes.bool,
  disabled: propTypes.bool,
  wrapperProps: propTypes.object,
}

export default Select
