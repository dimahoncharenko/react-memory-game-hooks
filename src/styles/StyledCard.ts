import styled from "@emotion/styled";

export const StyledCard = styled.div`
  --card-size: max(2.5em, 6vw);

  display: grid;
  width: var(--card-size);
  height: var(--card-size);
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: transform 0.4s linear;

  &.active {
    transform: rotateY(180deg);
  }

  > .frontface,
  > .backface {
    backface-visibility: hidden;
    max-width: 100%;
    max-height: 100%;
    grid-area: 1/-1;
  }

  > .frontface {
    transform: rotateY(-180deg);
  }

  > .backface {
    background-color: white;
  }
`;
