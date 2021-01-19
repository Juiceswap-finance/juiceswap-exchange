import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from '@juiceswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, ExternalLink, TYPE, HideSmall } from '../../theme'
import { Text } from 'rebass'
import Card from '../../components/Card'
import { RowBetween, RowFixed } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { Dots } from '../../components/swap/styleds'
// import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
// import { DataCard } from '../../components/earn/styled'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

// const VoteCard = styled(DataCard)`
//   background: linear-gradient(90deg, rgb(93 247 242) 0%, rgb(195 229 249) 100%);
//   overflow: hidden;
// `

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`

const ButtonRow = styled(RowFixed)`
  display: flex;
  flex-direction: column;
  width: 100%;

  a {
    width: 100% !important;
    padding: 19px 8px;
    margin-bottom: 10px;

    :active, :focus {
      box-shadow: unset;
    }
  }

`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  console.log('liquidityTokens>>',tokenPairsWithLiquidityTokens)
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))
  console.log('allV2PairsWithLiquidity>>',allV2PairsWithLiquidity)
  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />
        {/* <BoxColumn>
          <VoteCard>
            <CardBGImage />
            <CardNoise />
            <CardSection style={{ background: 'linear-gradient(to right, rgb(78 166 251), rgb(94 199 252), rgb(190 255 218))' }}>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="#ffffff" fontWeight={600}>Liquidity provider rewards</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="#ffffff" fontSize={14}>
                    {`Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.`}
                  </TYPE.white>
                </RowBetween>
                <ExternalLink
                  style={{ color: 'white'}}
                  target="_blank"
                  href="#"
                >
                  <TYPE.white color="#ffffff" fontSize={14}>Read more about providing liquidity</TYPE.white>
                </ExternalLink>
              </AutoColumn>
            </CardSection>
            <CardBGImage />
            <CardNoise />
          </VoteCard>
        </BoxColumn> */}

        <AutoColumn gap="lg" justify="center">
          <BoxColumn>
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <ButtonRow>
              <ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="6px 8px" to="/add/ETH">
                <Text fontWeight={500} fontSize={16}>
                  Add Liquidity
                </Text>
              </ResponsiveButtonPrimary>

              <ResponsiveButtonSecondary as={Link} padding="6px 8px" to="/create/ETH">
                Create a pair
              </ResponsiveButtonSecondary>
            </ButtonRow>

            <TitleRow style={{ }} padding={'0'}>
              <HideSmall>
                <TYPE.mediumHeader style={{ justifySelf: 'flex-start' }}>
                  Your liquidity
                </TYPE.mediumHeader>
              </HideSmall>
            </TitleRow>

            {!account ? (
              <Card padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  Connect to a wallet to view your liquidity.
                </TYPE.body>
              </Card>
            ) : v2IsLoading ? (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </EmptyProposals>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                <ButtonSecondary>
                  <RowBetween>
                    <ExternalLink href={'https://analytics.juiceswap.finance/accounts/' + account}>
                      Account analytics and accrued fees
                    </ExternalLink>
                    <span> ↗</span>
                  </RowBetween>
                </ButtonSecondary>

                {allV2PairsWithLiquidity.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
              </>
            ) : (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </EmptyProposals>
            )}

            <AutoColumn justify={'center'} gap="md">
              <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "Don't see a pool you joinedddd?"}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                </StyledInternalLink>
              </Text>
            </AutoColumn>
          </AutoColumn>
          </BoxColumn>
        </AutoColumn>
      </PageWrapper>
    </>
  )
}


const BoxColumn = styled.div`
  width: 100% !important;
`
