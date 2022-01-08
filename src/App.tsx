// Imports components
import { MemoryGame } from "./components/Memory-Game";

// Imports component that is responsible for global styles
import { Global } from "@emotion/react";

// Imports styles
import globalStyles from "./styles/global";

// Imports images
import images from "./Images";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <MemoryGame cards={[...images, ...images]} />
    </>
  );
}

export default App;
