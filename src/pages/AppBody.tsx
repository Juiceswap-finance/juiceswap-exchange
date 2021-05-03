import React from 'react'
import styled from 'styled-components'
import bgJuice from "../assets/images/orange-pool-bg.png";

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  // box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgba(0,0,0,0.23) -1px 7px 18px 0px;
  border-radius: 30px;
  padding: 1rem;
  top: 0;
  left: 0;
  background-image: url(${bgJuice});
  content: "";
  width: 100%;
  max-width: 560px;
  height: 598px;
  z-index: auto;
  background-size: cover;
  background-repeat: no-repeat;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
