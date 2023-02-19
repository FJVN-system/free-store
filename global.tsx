import { css, Global } from "@emotion/react";

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
);
