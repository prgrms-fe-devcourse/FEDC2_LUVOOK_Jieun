import styled from '@emotion/styled'

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Super = styled.sup`
  position: absolute;
  top: 2px;
  right: 7px;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  color: white;
  background-color: #ff4040;
  transform: translate(50%, -50%);
`

const Badge = ({ children, count, maxCount, showZero, ...props }) => {
  return (
    <BadgeContainer {...props}>
      {children}
      {count > 0 || (count === 0 && showZero) ? (
        <Super> {maxCount && count > maxCount ? `${maxCount}+` : count}</Super>
      ) : null}
    </BadgeContainer>
  )
}

export default Badge
