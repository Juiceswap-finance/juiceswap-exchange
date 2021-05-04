import React from 'react'
import styled from 'styled-components'
import bgJuice from "../assets/images/orange-pool-bg.png";

export const BodyWrapper = styled.div`
  position: relative;

  &:before{
    width: 100%;
    // box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgba(0,0,0,0.23) -1px 7px 18px 0px;
    border-radius: 30px;
    padding: 1rem;
    left: -178px;
    background-image: url(${bgJuice});
    content: "";
    width: 588px;
    height: 626px;
    z-index: auto;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;

    @media (max-width: 768px){
      width: 492px;
      height: 526px;
      left: -122px;
      top: 0;
    }

    @media (max-width: 414px){
      width: 400px;
      height: 432px;
      left: -90px;
      top: 0;
    }

    @media (max-width: 375px){
      width: 365px;
      height: 391px;
      left: -71px;
      top: 0;
    }
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
