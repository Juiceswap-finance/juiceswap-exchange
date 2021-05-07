import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const Row = styled(Box)<{ align?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: ${({ align }) => (align ? align : 'center')};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  text-align: center;
`

export const RowBetween = styled(Row)`
  justify-content: right;
  text-align: right;
  display: block;
  &.title-balance{
    min-height: 30px;
  }

  &.title-liquidity-create{
    display: flex;
    position: absolute;
    top: 83px;
    width: 397px;

    @media (max-width: 414px){
      top: 33px;
      width: 265px;
    }
  }
`

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export default Row
