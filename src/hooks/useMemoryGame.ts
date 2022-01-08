import { useCallback, useEffect, useReducer } from "react";

// Util functions
import { addIndex } from "../utils";

type State = {
  cards: string[];
  activeIndexes: number[];
  foundPairs: number[];
  isGameOver: boolean;
  score: number;
  clicks: number;
  highscore: string | null;
};

export const ACTIONS = {
  SET_ACTIVE_INDEX: "SET_ACTIVE_INDEX",
  REFILL_TABLE: "REFILL_TABLE",
  ADD_PAIR: "ADD_PAIR",
  SWITCH_GAME_OVER_ON: "SWITCH_GAME_OVER_ON",
  ADD_SCORE: "ADD_SCORE",
  RESET_GAME: "RESET_GAME",
  ADD_CLICK: "ADD_CLICK",
  SET_HIGHSCORE: "SET_HIGHSCORE",
} as const;

type ActionsWithoutPayload = Pick<
  typeof ACTIONS,
  | typeof ACTIONS["SWITCH_GAME_OVER_ON"]
  | typeof ACTIONS["RESET_GAME"]
  | typeof ACTIONS["ADD_CLICK"]
>;

type Action =
  | {
      type:
        | typeof ACTIONS["SET_ACTIVE_INDEX"]
        | typeof ACTIONS["ADD_SCORE"]
        | typeof ACTIONS["SET_HIGHSCORE"];
      payload: number;
    }
  | {
      type: typeof ACTIONS["REFILL_TABLE"];
      payload: State["cards"];
    }
  | {
      type: typeof ACTIONS["ADD_PAIR"];
      payload: number[];
    }
  | {
      type: keyof ActionsWithoutPayload;
    };

export const initialState = (): State => ({
  cards: [],
  activeIndexes: [],
  foundPairs: [],
  isGameOver: false,
  score: 0,
  clicks: 0,
  highscore: localStorage.getItem("best"),
});

export type Reducer = (state: State, action: Action) => State;

export const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_INDEX":
      return {
        ...state,
        activeIndexes: addIndex(
          state.activeIndexes,
          state.foundPairs,
          action.payload
        ),
      };
    case "REFILL_TABLE":
      return {
        ...state,
        cards: action.payload,
      };
    case "ADD_PAIR":
      return {
        ...state,
        foundPairs: [...state.foundPairs, ...action.payload],
      };
    case "SWITCH_GAME_OVER_ON":
      return {
        ...state,
        isGameOver: true,
      };
    case "ADD_SCORE":
      return {
        ...state,
        score: state.score + action.payload,
      };
    case "RESET_GAME":
      return initialState();

    case "ADD_CLICK":
      return {
        ...state,
        clicks: state.clicks + 1,
      };
    default:
      return state;
  }
};

export const useMemoryGame = (reducer = defaultReducer) => {
  const [gameState, dispatch] = useReducer(reducer, initialState());

  const addActiveIndex = (index: number) =>
    dispatch({ type: ACTIONS["SET_ACTIVE_INDEX"], payload: index });

  const refillTable = (matrix: State["cards"]) =>
    dispatch({ type: ACTIONS["REFILL_TABLE"], payload: matrix });

  const addPair = (pair: number[]) =>
    dispatch({ type: ACTIONS["ADD_PAIR"], payload: pair });

  const addClick = useCallback(
    () => dispatch({ type: ACTIONS["ADD_CLICK"] }),
    []
  );

  const switchGameOverOn = useCallback(() => {
    dispatch({
      type: ACTIONS["SWITCH_GAME_OVER_ON"],
    });
  }, []);

  const addScore = (score: number) =>
    dispatch({ type: ACTIONS["ADD_SCORE"], payload: score });

  const resetGame = dispatch.bind(null, { type: ACTIONS["RESET_GAME"] });

  useEffect(() => {
    if (gameState.isGameOver) return;

    addClick();

    if (gameState.activeIndexes.length === 2) {
      const first = gameState.activeIndexes[0];
      const second = gameState.activeIndexes[1];

      if (gameState.cards[first] === gameState.cards[second]) {
        addPair([first, second]);
        addScore(1);

        if (gameState.foundPairs.length + 2 === gameState.cards.length) {
          if (!gameState.highscore) {
            localStorage.setItem("best", `${gameState.clicks}`);
          } else if (+gameState.highscore > gameState.clicks - 1) {
            localStorage.setItem("best", `${gameState.clicks - 1}`);
          }
          switchGameOverOn();
        }
      }
    }
  }, [
    gameState.activeIndexes,
    gameState.isGameOver,
    gameState.cards,
    gameState.highscore,
    switchGameOverOn,
  ]);

  return {
    gameState,
    addActiveIndex,
    refillTable,
    addScore,
    addPair,
    resetGame,
    addClick,
  };
};
