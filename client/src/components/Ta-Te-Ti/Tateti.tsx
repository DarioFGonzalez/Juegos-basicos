import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Tateti.css';

const GRID = Array.from(Array(9).keys());

export const Tateti = () =>
{
    const [ squares, setSquares ] = useState( [ '', '', '', '', '', '', '', '', '',  ] )
    const [ players, setPlayers ] = useState( 'none' );
    const [ inicio, setInicio ] = useState( true );
    const [ turnoMaquina, setTurnoMaquina ] = useState( false );
    const [ turno, setTurno ] = useState( false );
    const [ winner, setWinner ] = useState( 'none' );
    const sign = [ 'Ta', '', '', '', 'Te', '', '', '', 'Ti',  ]
    
    const writeSquare = (i: number) =>
    {
      let x = 'none';
      
      if(players=='one')
      {
        let aux = squares;
        aux[i]= turno ? 'O' : 'X';
        setSquares( aux );
        x = winnerBoard( turno ? 'O' : 'X' );
      }
      else
      {
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
    
    const restart = (players: string) =>
    {
      setPlayers(players);
      players=='none' ? setInicio(true) : setInicio(false);
      if(players=='one')
      {
        if( Math.floor( Math.random() * ( 1 - 0 + 1 ) + 0 ) == 0 )
        {
          setTurnoMaquina( false );
          setTurno(!turno);
          setTurno(true);
        }
        else
        {
          setTurnoMaquina( true );
          setTurno(!turno);
          setTurno(true);
        }
      }
      let aux = squares;
      for(let i=0; i<9; i++)
      {
        aux[i]= '';
      }
      setSquares( aux );
      setWinner( 'none' );
    }
    
    useEffect( () =>
      {      
        if( players=='one' && turno==turnoMaquina && winner!='Empate' && winner!='O' && winner!='X')
        {
          let aux = squares;
          let available = [];
          for(let j=0; j<9; j++)
          {
            if(aux[j]=='')
            {
              available.push( j );
            }
          }
          let casilleroElegido =  Math.floor( Math.random() * ( ( available.length - 1 ) - 0 + 1 ) + 0 );
          aux[ available[casilleroElegido] ] = turno ? 'O' : 'X';
          setSquares( aux );
          let x = winnerBoard( turno ? 'O' : 'X' );
    
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
      },[turno, restart])
    
    return (
      <div>
        <Link to='/home'>
            <button> {"<"} </button>
        </Link>
    
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {winner=='none' && <h1> Turno de: {turno?'O':'X'}</h1>}
          {winner!='none' && <h1> El ganador es {winner=='O' ? 'O' : winner=='X' ? 'X' : 'ninguno, EMPATE.' } </h1>}
        </div>
    
        <main>
          { inicio && GRID.map((i) => (
            <div key={i} className="square" >
              {sign[i]}
            </div>
          ))}
          {players == 'one' && GRID.map((i) => (
            <div key={i}  className="verde" onClick={() => { (squares[i]=='' && winner=='none') && writeSquare(i) }}>
              {squares[i]}
            </div>
          ))}
          {players == 'two' && GRID.map((i) => (
            <div key={i} className="azul" onClick={() => { (squares[i]=='' && winner=='none') && writeSquare(i) }}>
              {squares[i]}
            </div>
          ))}
        </main>
    
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          { winner!='none' && <button onClick={()=> restart('none') }> Inicio </button>}
          { (inicio || winner!='none') && <button onClick={()=> restart('one') }> Un jugador </button>}
          { (inicio || winner!='none') && <button onClick={()=> restart('two') }> Dos jugadores </button>}
        </div>
        
      </div>
    );
}