import { useCallback, useEffect } from "react";

// Components
import { Card } from "./Card";

// Hooks
import { useMemoryGame } from "../hooks/useMemoryGame";

// Styles
import {
  StyledMemoryTable,
  StyledGameStats,
  StyledTop,
} from "../styles/StyledMemoryGame";

// Utils
import { shuffle } from "lodash";

type Props = {
  cards: string[];
};

export const MemoryGame = ({ cards }: Props) => {
  const { gameState, addActiveIndex, refillTable, resetGame } = useMemoryGame();

  const newGame = () => {
    resetGame();
    refillTable(shuffle(cards));
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <>
      <StyledTop>TOP {gameState.highscore}</StyledTop>
      <StyledMemoryTable>
        {gameState.cards.map((card, index) => (
          <Card
            key={index}
            callback={() => addActiveIndex(index)}
            isActive={
              gameState.activeIndexes.includes(index) ||
              gameState.foundPairs.includes(index)
            }
            source={card}
          />
        ))}
      </StyledMemoryTable>

      <StyledGameStats isGameOver={gameState.isGameOver}>
        <p>Score: {gameState.score}</p>
        <div className="game-over">
          <p>
            Congratulations, you won the game by clicking {gameState.clicks - 1}{" "}
            times!
          </p>
          <button className="reset" onClick={newGame}>
            Again?
          </button>
        </div>
      </StyledGameStats>
    </>
  );
};
