import { useState } from "react";

const GRID = Array.from(Array(9).keys());

function App()
{
  const [ squares, setSquares ] = useState( [ '', '', '', '', '', '', '', '', '',  ] )
  const [ turno, setTurno ] = useState( false );
  const [ winner, setWinner ] = useState( 'none' );

  const writeSquare = (i: number) =>
  {
    let x = 'none';
    if(turno)
    {
      let aux = squares;
      aux[i]='O';
      setSquares( aux );
      x = winnerBoard('O');
    }
    else
    {
      let aux = squares;
      aux[i]='X';
      setSquares( aux );
      x = winnerBoard('X');
    }
    

    if(x=='none')
    {
      if(!checkBoard())
      {
        alert('¡Sin mas movimientos!');
        setWinner('Empate');
      }
      setTurno(!turno);
    }
    else
    {
      alert( `¡Gana el jugador ${x}!` );
      console.log( `¡Gana el jugador ${x}!` );
      setWinner( x );
    }
  }

  const checkBoard = () =>
  {
    let flag = false;
    for(let i=0; i<9; i++)
    {
      if(squares[i]=='')
      {
        flag = true;
      }
    }
    return flag;
  }

  const winnerBoard = ( mark: string) =>
  {
    let winner = 'none';
    // ↓ ↓ ↓
    if(squares[0]==mark && squares[1]==mark && squares[2] == mark)
    {
      winner = mark;
    }
    if(squares[3]==mark && squares[4]==mark && squares[5] == mark)
    {
      winner = mark;
    }
    if(squares[6]==mark && squares[7]==mark && squares[8] == mark)
    {
      winner = mark;
    }
    // → → →
    if(squares[0]==mark && squares[3]==mark && squares[6] == mark)
    {
      winner = mark;
    }
    if(squares[1]==mark && squares[4]==mark && squares[7] == mark)
    {
      winner = mark;
    }
    if(squares[2]==mark && squares[5]==mark && squares[8] == mark)
    {
      winner = mark;
    }
    // →↓ && →↑
    if(squares[0]==mark && squares[4]==mark && squares[8] == mark)
    {
      winner = mark;
    }
    if(squares[6]==mark && squares[4]==mark && squares[2] == mark)
    {
      winner = mark;
    }
    
    return winner;
  }

  const restart = () =>
  {
    let aux = squares;
    for(let i=0; i<9; i++)
    {
      aux[i]= '';
    }
    setSquares( aux );
    setWinner( 'none' );
  }

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {winner=='none' && <h1> Turno de: {turno?'O':'X'}</h1>}
        {winner!='none' && <h1> El ganador es {winner=='O' ? 'O' : winner=='X' ? 'X' : 'ninguno, EMPATE.' } </h1>}
      </div>

      <main>
        {GRID.map((i) => (
          <div key={i} className="square" onClick={() => { (squares[i]=='' && winner=='none') && writeSquare(i) }}>
            {squares[i]}
          </div>
        ))}
      </main>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {winner!='none' && <button onClick={restart}> ♫ Otra vez ♪</button>}
      </div>
      
    </div>
  );
}

export default App;
