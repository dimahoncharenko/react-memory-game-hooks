import styled from "@emotion/styled";

export const StyledMemoryTable = styled.div`
  display: grid;
  grid-template-columns: repeat(6, min-content);
  place-items: center;
  max-width: min(800px, 100% - 1em);
  margin: 0 auto;
  gap: 0.1em;
`;

export const StyledGameStats = styled.div<{
  isGameOver: boolean;
}>`
  color: white;
  text-align: center;
  font-size: clamp(0.4em, 1vw + 0.3em, 1em);
  padding: 0.3em;

  p {
    margin: 0 0 max(0.3rem, 0.5vw) 0;
  }

  > .game-over {
    display: ${(props) => (props.isGameOver ? "block" : "none")};

    > .reset {
      background-color: white;
      padding: max(0.4em, 1vw);
      border-radius: 0.8em;
      font-weight: bolder;
      border: 0;
      cursor: pointer;
    }
  }
`;

export const StyledTop = styled.div`
  color: white;
  text-align: center;
  font-size: clamp(1rem, 1vw + 0.5rem, 2rem);
  padding: 0.3em;
`;
