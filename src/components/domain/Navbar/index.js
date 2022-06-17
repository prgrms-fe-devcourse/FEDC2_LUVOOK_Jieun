import React, { useState } from 'react'
import styled from '@emotion/styled'
import uuid from 'react-uuid'

const NavbarWrapper = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavbarItem = styled.li`
  cursor: pointer;
`

const NavbarActiveItem = styled.li`
  cursor: pointer;
  background-color: red;
`

const Navbar = ({
  items,
  activeIndex = 0,
  handleClick,
  navbarWrapperStyle,
  navbarItemStyle,
  activeItemStyle,
  ...props
}) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex)

  return (
    <NavbarWrapper {...navbarWrapperStyle} {...props}>
      {items?.map((item, index) =>
        index === currentActiveIndex ? (
          <NavbarActiveItem
            {...activeItemStyle}
            key={item.id ? item.id : uuid()}
            onClick={() => {
              setCurrentActiveIndex(index)
              handleClick(item)
            }}
          >
            {item.name}
          </NavbarActiveItem>
        ) : (
          <NavbarItem
            {...navbarItemStyle}
            key={item.id ? item.id : uuid()}
            onClick={() => {
              setCurrentActiveIndex(index)
              handleClick(item)
            }}
          >
            {item.name}
          </NavbarItem>
        )
      )}
    </NavbarWrapper>
  )
}

export default Navbar
