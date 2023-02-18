import { css, Global, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        background: papayawhip;
        font-family: Helvetica, Arial, sans-serif;
      }
    `}
  />
)

