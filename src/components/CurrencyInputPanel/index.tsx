import { Currency, Pair } from '@juiceswap/sdk'
import React, { useState, useContext, useCallback } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  // align-items: center;
  // padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
  // justify-content: center;
  display: inline-flex;
  width: 100%;
  justify-content: flex-end;

  // @media (max-width: 414px){
  //   padding: 0;
  // }

`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  // height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  // background: ${({ selected, theme }) => (selected ? theme.bg1 : theme.gradient)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 20px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  color: #de4400;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 50%);
  background: #fff;


  :focus{
    outline: none !important;
  }
  :focus,
  :hover {
    // background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }

  @media (max-width: 414px){
    height: 25px;

    img{
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
`

const LabelRow = styled.div`
  // ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  // line-height: 1rem;
  // padding: 0.75rem 1rem 0 1rem;
  display: flex;
  flex: 1;
  align-items: center;
  justify-items: center;
  flex-wrap: wrap;

  @media (max-width: 414px){
    padding: 3px;
  }

  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(DropDown) <{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: #fa8942;
    // stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 2px;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  // background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
  // min-height: 155.188px;

  @media (max-width: 414px){
    min-height: 60px;
  }

  @media (max-width: 375px){}
`

const Container = styled.div<{ hideInput: boolean }>`
  // border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  // border: 1px solid ${({ theme }) => theme.borderBG};
  // background-color: ${({ theme }) => theme.bg1};
  border-radius: 20px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.41);
  border: solid 3px #ffffff;
  background-color: rgba(255, 253, 211, 0.7);
  display: flex;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  padding: 10px 15px;

  @media (max-width: 414px){
    padding: 5px 10px;
    max-width: 258px;
  }

  h3{
    text-align: left;
    font-weight: 700;
    color: #ff5722;
    margin: 0;

    @media (max-width: 414px){
      margin: 0;
      font-size: 18px;
    }
  }
  .token-amount-input{
    background: transparent;
    color: #676767;
    width: 100%;
    font-size: 22px;
  }
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};
  &.token-symbol-container{
    border-radius: 20px;
    margin-right: 0;
    padding: 5px;
    white-space: nowrap;

    @media (max-width: 414px){
      font-size: 10px;
      margin: 0;
      padding: 0;
    }
  }
`

const StyledBalanceMax = styled.button`
  color: #de4400;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 50%);
  border: none;
  // height: 32px;
  background-color: #fff;
  // border: 1px solid ${({ theme }) => theme.text6};
  border-radius: 0.5rem;
  font-size: 20px;
  cursor: pointer;
  margin-right: 0.5rem;
  // color: ${({ theme }) => theme.text1};

  :hover {
    // border: 1px solid ${({ theme }) => theme.text6};
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.text6};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
  @media (max-width: 414px){
    font-size: 12px;
  }
`

const StyleTitleInput = styled.div`
  flex-basis: 40%;
`;

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customBalanceText
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const theme = useContext(ThemeContext)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {/* <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>

        </TYPE.body> */}

        {!hideInput && (
          <>
            <StyleTitleInput>
              <h3>{label}</h3>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
              />
            </StyleTitleInput>
            <LabelRow>
              <RowBetween>
                {account && (
                  <TYPE.body
                    onClick={onMax}
                    color={theme.text2}
                    fontWeight={500}
                    fontSize={14}
                    className="title-balance"
                    style={{
                      display: 'inline',
                      cursor: 'pointer'
                    }}
                  >
                    {!hideBalance && !!currency && selectedCurrencyBalance
                      ? (customBalanceText ?? 'Balance: ') + selectedCurrencyBalance?.toSignificant(6)
                      : ' -'}
                  </TYPE.body>
                )}
              </RowBetween>
              <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
                {!hideInput && (
                  <>
                    {account && currency && showMaxButton && label !== 'To' && (
                      <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
                    )}
                  </>
                )}
                <CurrencySelect
                  selected={!!currency}
                  className="open-currency-select-button"
                  onClick={() => {
                    if (!disableCurrencySelect) {
                      setModalOpen(true)
                    }
                  }}
                >
                  <Aligner>
                    {pair ? (
                      <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
                    ) : currency ? (
                      <CurrencyLogo currency={currency} size={'24px'} />
                    ) : null}
                    {pair ? (
                      <StyledTokenName className="pair-name-container">
                        {pair?.token0.symbol}:{pair?.token1.symbol}
                      </StyledTokenName>
                    ) : (
                        <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                          {(currency && currency.symbol && currency.symbol.length > 20
                            ? currency.symbol.slice(0, 4) +
                            '...' +
                            currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                            : currency?.symbol) || t('selectToken')}
                        </StyledTokenName>
                      )}
                    {!disableCurrencySelect && <StyledDropDown selected={!!currency} />}
                  </Aligner>
                </CurrencySelect>
              </InputRow>
            </LabelRow>
          </>
        )}
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
