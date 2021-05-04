import React from 'react'
import styled from 'styled-components'
import bgJuice from "../assets/images/swapv1/bg-or2.png";

export const BodyWrapper = styled.div`
  // box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgba(0,0,0,0.23) -1px 7px 18px 0px;
  border-radius: 30px;
  padding: 1rem;
  position: relative;
  top: 90px;

  &:before{
    background-image: url(${bgJuice});
    content: "";
    left: -95px;
    top: -18px;
    height: 500px;
    width: 467px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;

    @media (max-width: 768px){}

  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
