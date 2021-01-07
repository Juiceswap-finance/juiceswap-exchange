import React, { useState } from 'react'
import Swap from '../index'
import Pool from '../../Pool/index'


import styled from 'styled-components'




const HeaderFrame = styled.div`
  display: grid;
  grid-column-start: 2;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  z-index: 2;

  ul {
      padding-left: 0;
  }
`


const NavTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;

  a {
    padding: 0 10px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    width: 50%;
    text-align: center;

    &.active {
      color
    }

    &:hover, &:active, focus {
      color: #565A69;
    }
  }
`

const Tab = styled.div`
  position: relative;
  width: 420px;
  background: ${({ theme }) => theme.bg7};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 30px;
  padding: 1rem;

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(1, 300px);
    width: 100%;
  }
`



export default function Header() {

  const [isTab, setTab] = useState('swap')

  const ChangeTab = (value:string) => setTab(value)

  return (
    <HeaderFrame>
      <Tab>
        <NavTab>
          <a className="active" onClick={()=>ChangeTab('swap')}>
              Swap
          </a>
          <a className="active" onClick={()=>ChangeTab('pool')}> Pool </a>
        </NavTab>
        {isTab==='swap'? <Swap/> : <Pool/>}
      </Tab>
    </HeaderFrame>
  )
}

