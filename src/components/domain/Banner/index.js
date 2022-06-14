import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  overflow: hidden;
  margin-top: 30px;
  .banner-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    border: solid 1px #ffffff;
    .banner-title {
      color: #743737;
      font-size: 36px;
      font-weight: bold;
    }
  }
`

const quotes = [
  {
    no: 1,
    quote: '『아이들은 누구나 예술가이다. - 피카소』',
  },
  {
    no: 2,
    quote: '『내면의 목소리는 들리지 않게 된다. - 반 고흐』',
  },
  {
    no: 3,
    quote: '『완벽을 두려워하지 말라. - 달리』',
  },
  {
    no: 4,
    quote: '『영감이 오는 것을 기다리고 있을 수는 없다. - 런던』',
  },
  {
    no: 5,
    quote: '『의욕만 있으면 이런 노력만으로도 얼마든지 많은 생각을 찾을 수 있다. - 수스』',
  },
]
const Banner = () => {
  const [idx, setIdx] = useState(0)
  const idxRef = useRef(0)

  useEffect(() => {
    setInterval(() => {
      idxRef.current = (idxRef.current + 1) % quotes.length
      setIdx(idxRef.current)
    }, 10000)
  }, [])

  return (
    <BannerContainer>
      <div className="banner" style={{ transform: `translateY(-${50 * idx}px)` }}>
        {quotes.map((item, idx) => {
          return (
            <li className="banner-content" key={idx}>
              <div>
                <div className="banner-title">{item['quote']}</div>
              </div>
            </li>
          )
        })}
      </div>
    </BannerContainer>
  )
}

export default Banner
