import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const PRIMARY_COLOR = '#743737'

const Wrapper = styled.div`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
`

const Label = styled.label`
  display: none;
  font-size: 12px;
`

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 6px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : PRIMARY_COLOR)};
  border-radius: 4px;
  box-sizing: border-box;
`

const Input = ({
  type,
  name,
  label,
  value,
  placeholder,
  onChange,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  wrapperProps,
  ...props
}) => {
  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        {...props}
      />
    </Wrapper>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  block: PropTypes.bool,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
}

export default Input
