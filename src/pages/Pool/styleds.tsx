import { Text } from 'rebass'
import styled from 'styled-components'
import bgContentPool from "../../assets/images/swapv1/Group_7330.png"

export const Wrapper = styled.div`
  position: relative;
  margin-top: 166px;

  @media (max-width: 768px){
    // margin-top: 34px;
    margin-top: 120px;
  }

  @media (max-width: 414px){
    margin-top: 100px;
  }

  @media (max-width: 375px){
    margin-top: 83px;
  }

  &:before{
    background-image: url(${bgContentPool});
    content: '';
    height: 446px;
    width: 446px;
    background-size: cover;
    left: -98px;
    right: 0;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 36px;

    @media (max-width: 768px){
      content: '';
      height: 377px;
      width: 377px;
      background-size: cover;
      left: -73px;
      right: 0;
      background-repeat: no-repeat;
      top: -7px;
      position: absolute;
    }

    @media (max-width: 414px){
      content: '';
      height: 308px;
      width: 308px;
      background-size: cover;
      left: -38px;
      right: 0;
      background-repeat: no-repeat;
      top: -8px;
    }

    @media (max-width: 375px){
      content: '';
      height: 274px;
      width: 274px;
      background-size: cover;
      left: -20px;
      right: 0;
      background-repeat: no-repeat;
      top: 3px;
    }
  }

  .col-add-liquidity{
    grid-row-gap: 20px;
    justify-content: center;

    @media (max-width: 768px){
      grid-row-gap: 54px;
      transform: translate(5px, 21px);
      z-index: 1;
    }

    @media (max-width: 414px){
      grid-row-gap: 20px;
    }

    @media (max-width: 375px){
      grid-row-gap: 15px;
    }
  }
`

export const ClickableText = styled(Text)`
  :hover {
    cursor: pointer;
  }

  color: #fff;
`
export const MaxButton = styled.button<{ width: string }>`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.25rem 0.5rem;
  `};
  font-weight: 500;
  cursor: pointer;
  margin: 0.25rem;
  overflow: hidden;
  color: ${({ theme }) => theme.primary1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`

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
