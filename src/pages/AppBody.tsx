import React from 'react'
import styled from 'styled-components'
import bgJuice from "../assets/images/swapv1/br2.png";

export const BodyWrapper = styled.div`
  // box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgba(0,0,0,0.23) -1px 7px 18px 0px;
  position: relative;
  width: 576px;

  &:before{
    background-image: url(${bgJuice});
    content: "";
    top: 0;
    height: 640px;
    width: 515px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 414px){
      height: 455px;
      width: 365px;
    }
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
