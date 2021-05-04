import React, { useState } from 'react'
import Swap from '../index'
import Pool from '../../Pool/index';
import bgJuice from "../../../assets/images/orange-pool-bg.png"

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
  padding-top: 0;
  // margin-top: 20px;
  z-index: 11;

  @media (min-width: 768px){
    // padding-top: 50px;
  }
  a {
    z-index: 9;
    padding: 0 10px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    width: 50%;
    text-align: center;
    color: #ffffff;
    text-shadow: 2px 2px #1d1d1da1;

    &.active {
      text-decoration: none;
    }

    &:hover, &:active, focus {
      color: #565A69;
      text-shadow: 2px 2px #fff;
    }
  }
`

const Tab = styled.div`
  position: relative;
  width: 576px;
  // background: ${({ theme }) => theme.bg7};

  background-repeat: no-repeat;
  background-size: cover;
  // box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgba(0, 0, 0, 0.23) -1px 7px 18px 0px;
  border-radius: 30px;
  padding: 1rem;

  ::after{
    top: 0;
    left: 0;
    // background-image: url(${bgJuice});
    content: "";
    position: absolute;
    width: 100%;
    max-width: 560px;
    height: 598px;
    z-index: auto;
    background-size: cover;
    background-repeat: no-repeat;

    @media (max-width: 768px){
      max-width: 349px;
      width: 100%;
      height: 346px;
      z-index: auto;
      background-size: contain;
    }
  }

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(1, 300px);
    width: 100%;
  }
`



export default function Header() {

  const [isTab, setTab] = useState('swap')

  const ChangeTab = (value: string) => setTab(value)

  return (
    <HeaderFrame>
      <Tab>
        <NavTab>
          <a className="active" onClick={() => ChangeTab('swap')}>
            Swap
          </a>
          <a className="active" onClick={() => ChangeTab('pool')}> Pool </a>
        </NavTab>
        {isTab === 'swap' ? <Swap /> : <Pool />}
      </Tab>
    </HeaderFrame>
  )
}

