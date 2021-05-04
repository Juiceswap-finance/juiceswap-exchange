import { transparentize } from 'polished'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import styled, { css } from 'styled-components'
import { Text } from 'rebass'
import { AutoColumn } from '../Column';
import imgOrigan1 from "../../assets/images/swapv1/or.png";
import imgOrigan2 from "../../assets/images/swapv1/or2.png"

export const Wrapper = styled.div`
  position: relative;
  z-index: 9;
  padding: 40px 0;
  onMax?: () => void;
  showMaxButton: boolean;
  transform: translateY(40px);


  @media (max-width: 768px){
    transform: translateY(45px);
  }

  @media (max-width: 414px){
    padding: 13px 0;
    transform: translateY(0px);
  }

  &:before{
    background-image: url(${imgOrigan1});
    content: "";
    background-size: cover;
    background-repeat: no-repeat;
    height: 177px;
    width: 403px;
    position: absolute;
    top: 22px;
    left: 70px;

    // @media (max-width: 768px){
    //   top: 41px;
    //   height: 139px;
    //   width: 317px;
    //   left: 19%;
    // }

    @media (max-width: 414px){
      top: 9px;
      height: 103px;
      width: 235px;
      left: 32px;
    }
  }
  &:after{
    background-image: url(${imgOrigan2});
    content: "";
    background-size: cover;
    background-repeat: no-repeat;
    height: 177px;
    width: 403px;
    position: absolute;
    bottom: 118px;
    left: 70px;

    @media (max-width: 768px){
      bottom: 120px;
    }

    @media (max-width: 414px){
      height: 103px;
      width: 235px;
      left: 32px;
      bottom: 70px;
    }
  }

  .icon-dow-mid{
    .img-dow-mid{
      @media (max-width: 414px){
        height: 13px;
      }
    }
    @media (max-width: 768px){
      // margin-top: 10px;
    }


  }
  .content-from-to{
    grid-row-gap: 24px;

    @media (max-width: 768px){
      padding: 0;

      #swap-currency-output{}
    }

    @media (max-width: 768px){
      grid-row-gap: 24px;
    }

    @media (max-width: 414px){
      grid-row-gap: 18px;
    }
  }
`

export const ArrowWrapper = styled.div<{ clickable: boolean }>`
  padding: 2px;

  ${({ clickable }) =>
    clickable
      ? css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
      : null}
`

export const SectionBreak = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg3};
`

export const BottomGrouping = styled.div`
  // margin-top: 1rem;
  text-align: center;
  transform: translateY(55px);

  @media (max-width: 768px){
    transform: translateY(-10px);
  }

  .btn-connect-collect{
    margin: auto;
    border-radius: 40px;
    color: #f77b00;
    width: 300px;
    transform: translateY(10px);

    @media (max-width: 768px){
      width: 200px;
      transform: translateY(50px);
    }

    @media (max-width: 414px){
      padding: 0px;
      height: 35px;
      transform: translateY(25px);
      div{
        font-size: 16px;
      }
    }
  }
`

export const ErrorText = styled(Text) <{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? theme.red1
      : severity === 2
        ? theme.yellow2
        : severity === 1
          ? theme.text1
          : theme.green1};
`

export const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.bg2};
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  :focus {
    background-color: ${({ theme }) => theme.bg3};
    outline: none;
  }
`

export const TruncatedText = styled(Text)`
  text-overflow: ellipsis;
  width: 220px;
  overflow: hidden;
`

// styles
export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

const SwapCallbackErrorInner = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.red1};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`

export function SwapCallbackError({ error }: { error: string }) {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <AlertTriangle size={24} />
      </SwapCallbackErrorInnerAlertTriangle>
      <p>{error}</p>
    </SwapCallbackErrorInner>
  )
}

export const SwapShowAcceptChanges = styled(AutoColumn)`
  background-color: ${({ theme }) => transparentize(0.9, theme.primary1)};
  color: ${({ theme }) => theme.primary1};
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`
