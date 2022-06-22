import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { v4 as uuidv4 } from 'uuid'

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 55px;
  overflow: hidden;
  margin-top: 10px;

  .banner-content {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;

    .banner-title {
      color: var(--color-primary);
      font-size: 36px;
      font-weight: bold;
    }
  }
`

const quotes = [
  {
    id: uuidv4(),
    quote: '『아이들은 누구나 예술가이다. - 피카소』',
  },
  {
    id: uuidv4(),
    quote: '『내면의 목소리는 들리지 않게 된다. - 반 고흐』',
  },
  {
    id: uuidv4(),
    quote: '『완벽을 두려워하지 말라. - 달리』',
  },
  {
    id: uuidv4(),
    quote: '『영감이 오는 것을 기다리고 있을 수는 없다. - 런던』',
  },
]

const Banner = () => {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const quoteRef = useRef(0)

  useEffect(() => {
    setInterval(() => {
      quoteRef.current = (quoteRef.current + 1) % quotes.length
      setQuoteIdx(quoteRef.current)
    }, 10000)
  }, [])

  return (
    <BannerContainer>
      <div className="banner" style={{ transform: `translateY(-${55 * quoteIdx}px)` }}>
        {quotes.map(({ id, quote }) => {
          return (
            <li className="banner-content" key={id}>
              <div className="banner-title">{quote}</div>
            </li>
          )
        })}
      </div>
    </BannerContainer>
  )
}

export default Banner
