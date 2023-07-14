import Header from "./components/Header/Header";
import HomePage from "./components/Home/Home";
import {Route,Routes} from 'react-router-dom'
import TicTacToe from "./components/games/TicTacToe";
import SnakeGame from "./components/games/SnakeGame";

function App() {
  return (
    <div >
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/tic-tac-toe' element={<TicTacToe/>}/>
       
                
             
      </Routes>
    </div>
  );
}

export default App;
