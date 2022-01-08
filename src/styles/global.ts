import { css } from "@emotion/react";

export default css`
  :root {
    --background: hsl(210deg, 50%, 13%);

    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    background-color: var(--background);
    height: 100vh;

    display: flex;
    flex-direction: column;

    > * {
      margin: auto;
    }
  }
`;
