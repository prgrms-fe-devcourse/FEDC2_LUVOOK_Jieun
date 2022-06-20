import React, { useState } from 'react'
import styled from '@emotion/styled'

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavbarList = styled.ul`
  width: 89%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const NavbarItem = styled.li`
  cursor: pointer;
`

const NavbarActiveItem = styled.li`
  cursor: pointer;
`

const Navbar = ({
  items,
  activeIndex = 0,
  handleClick,
  navbarWrapperStyle,
  navbarListStyle,
  navbarItemStyle,
  activeItemStyle,
  ...props
}) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex)

  return (
    <NavbarWrapper style={{ ...navbarWrapperStyle }} {...props}>
      <NavbarList style={{ ...navbarListStyle }}>
        {items?.map((item, index) =>
          index === currentActiveIndex ? (
            <NavbarActiveItem
              style={{ ...activeItemStyle }}
              key={item.id}
              onClick={() => {
                setCurrentActiveIndex(index)
                handleClick(item)
              }}
            >
              {item.name}
            </NavbarActiveItem>
          ) : (
            <NavbarItem
              style={{ ...navbarItemStyle }}
              key={item.id}
              onClick={() => {
                setCurrentActiveIndex(index)
                handleClick(item)
              }}
            >
              {item.name}
            </NavbarItem>
          )
        )}
      </NavbarList>
    </NavbarWrapper>
  )
}

export default Navbar
