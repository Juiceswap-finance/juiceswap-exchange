import React, { useState } from 'react'
import Swap from '../index'
import Pool from '../../Pool/index';
import styled from 'styled-components';
import bgContentPool from "../../../assets/images/swapv1/br2.png"


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
  position: absolute;
  top: 188px;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  max-width: 300px;

  @media (max-width: 414px){
    top: 136px;
    max-width: 245px;
  }

  a {
    z-index: 9;
    padding: 0 10px;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
    width: 50%;
    text-align: center;
    color: #ffffff;
    text-shadow: 2px 2px #1d1d1da1;

    @media (max-width: 414px){
      font-size: 18px;
    }

    &.active {
      text-decoration: none;
    }

    &:hover, &:active, focus {
      color: #565A69;
      text-shadow: 2px 2px #fff;
    }
  }
`




export default function Header() {

  const [isTab, setTab] = useState('swap')

  const Tab = styled.div`
    position: relative;
    width: 576px;
    // background: ${({ theme }) => theme.bg7};
    // box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgba(0, 0, 0, 0.23) -1px 7px 18px 0px;

    @media (max-width: 414px){
      width: 440px;
    }

    &:before{
      background-image: url(${bgContentPool});
      content: '';
      height: 640px;
      width: 515px;
      z-index: 2;
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      @media (max-width: 414px) {
        height: 455px;
        width: 365px;
      }

      @media (max-width: 375px) {}
    }

    @media (max-width: 640px) {
      // display: grid;
      // grid-template-columns: repeat(1, 300px);
      // width: 100%;
    }
  `


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

