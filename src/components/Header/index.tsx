import { ChainId, TokenAmount } from '@forbitswap/sdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { useIsDarkMode } from '../../state/user/hooks'

import styled from 'styled-components'

import Logo from '../../assets/images/logo.png'
import LogoDark from '../../assets/images/logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useAggregateUniBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink } from '../../theme'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'
import usePrevious from '../../hooks/usePrevious'

import { Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap'


const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #cfeef3;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background: linear-gradient(90deg, rgb(93 247 242) 0%, rgb(195 229 249) 100%);
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  margin-top: -6px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 16px;
  }

  img {
    @media (max-width: 768px) {
      transform: scale(0.8);
    }
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    text-decoration: none;
  }
`

const StyledNav = styled(Navbar)`
  @media (max-width: 768px) {
    background-color: transparent !important;
    position: absolute;
    top: 26px;
    left: 7px;

    @media (min-width: 768px) {
      width: 18px;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .navbar-collapse {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      z-index: 10;
      background-color: rgba(4, 4, 4, 0.5);
      opacity: 0;
      transition: opacity 0.2s;

      @media (min-width: 768px) {
        background-color: transparent;
        opacity: 1;
      }

      &.show {
        opacity: 1;

        .navbar-nav {
          width: 280px;
          display: flex;
          flex-direction: column;
        }
      }
    }

    .navbar-nav {
      flex: 0 0 280px;
      width: 0;
      transition: width 0.5s;
      position: absolute;
      top: -30px;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      background: #fff;
      flex: 0 0 100%;
      padding: 85px 15px 30px;

      @media (min-width: 768px) {
        width: auto;
        top: 22px;
        right: -194px;
        left: auto;
        background-color: transparent;
        background: transparent;
        transform: unset;
        overflow-y: unset;
        padding: 0;
      }

      @media (min-width: 991px) {
        top: 30px;
        right: -199px;
      }

      a {
        padding-right: 10px;
        padding-left: 10px;
        font-weight: 600;
        text-decoration: none;
        margin-left: -15px;
        margin-right: -15px;
        padding: 10px 23px;
        white-space: nowrap;

        &:last-child {
          border: none;
        }

        @media (min-width: 768px) {
          border: none;
          padding-right: 10px;
          padding-left: 10px;
          margin: 0;
          background-color: transparent;
          font-size: 12px;
        }

        @media (min-width: 991px) {
          padding-right: 16px;
          padding-left: 16px;
          font-size: 16px;
        }

        &:after {
          @media (min-width: 768px) {
            content: '';
            display: block;
            width: 0;
            height: 2px;
            background: #ddd;
            transition: width 0.2s;
          }
        }

        &:hover {
          color: green;
          font-weight: 600;
          text-decoration: none;

          &:after {
            width: 100%;
            background: green;
          }
        }

        &.active {
          color: green;
          font-weight: 600;

          &:after {
            background: green;
          }
        }
      }
    }

    .navbar-toggler {
      border-color: transparent;
      outline: none;
      position: fixed;
      z-index: 11;
      display: block;

      @media (max-width: 768px) {
        padding: 9px;
      }

      &[aria-expanded='true'] {
        .navbar-toggler-icon {
          background-color: transparent;

          &:before,
          &:after {
            top: auto;
            bottom: 0;
          }

          &:before {
            transform: rotate(-45deg);
          }

          &:after {
            transform: rotate(45deg);
          }
        }
      }
    }

    .navbar-toggler-icon {
      background-image: none;
      width: 18px;
      height: 1.6px;
      position: absolute;
      top: 8px;
      left: 12px;
      background: red;

      @media (min-width: 768px) {
        width: 23px;
      }

      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 0;
        display: inline-block;
        width: 18px;
        height: 1.6px;
        transition: transform 400ms ease-in-out;
        background: red

        @media (min-width: 768px) {
          width: 23px;
        }
      }

      &:before {
        top: -6px;

        @media (min-width: 768px) {
          top: -8px;
        }
      }

      &:after {
        bottom: -6px;

        @media (min-width: 768px) {
          bottom: -8px;
        }
      }
    }
  }

  .navbar-toggler {
    display: none;

    @media (max-width: 768px) {
      display: block;
      background: transparent;
    }
  }

  .navbar-nav {
    display: flex;
  }
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const darkMode = useIsDarkMode()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const [isAre, setAreaIsOpen] = useState(false)

  const aria = () => setAreaIsOpen(!isAre)

  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <Title href=".">
          <UniIcon>
            <img width={'150px'} src={isDark ? LogoDark : Logo} alt="logo" />
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyledNav color="light" light expand="md">
            <NavbarToggler
              aria-expanded={isAre}
              onClick={() => {
                toggle()
                aria()
              }}
            />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
                    {t('swap')}
                </StyledNavLink>
                <StyledNavLink
                  id={`pool-nav-link`}
                  to={'/pool'}
                  isActive={(match, { pathname }) =>
                    Boolean(match) ||
                    pathname.startsWith('/add') ||
                    pathname.startsWith('/remove') ||
                    pathname.startsWith('/create') ||
                    pathname.startsWith('/find')
                  }
                >
                  {t('pool')}
                </StyledNavLink>
                  <a className={`${darkMode?'sc-qrIAp ebAwSE':'sc-qrIAp bZPGFH'}`} id={`swap-nav-link`} target="_blank"  href={"//www.juiceswap.finance/farms"}>
                    Yeild Farm
                  </a>
                <StyledExternalLink id={`stake-nav-link`} href={"//www.juiceswap.finance/Reclamation"}>
                  Reclamation
                </StyledExternalLink>
                <StyledExternalLink id={`stake-nav-link`} href={'//www.juiceswap.finance/Staking'}>
                  Staking
                </StyledExternalLink>
              </Nav>
            </Collapse>
          </StyledNav>
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? <Dots>Claiming FBT</Dots> : 'Claim FBT'}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          {!availableClaim && aggregateBalance && (
            <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                JUS
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} ETH
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
