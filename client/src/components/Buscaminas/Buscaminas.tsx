import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Buscaminas.css';

const GRID = Array.from(Array(9).keys());

export const Buscaminas = () =>
{
    const [ squares, setSquares ] = useState( [ '', '', '', '', '', '', '', '', '',  ] )
    const sign = [ '', '', '', 'Busca', '💣', 'Minas', '', '', '',  ]
    const [ winner, setWinner ] = useState( 'none' );
    const [ click, setClick ] = useState( false );
    const [ start, setStart ] = useState( false );

    const makeAmove = ( spot: number ) =>
    {        
        if(squares[spot]=='' && winner=='none')
        {
            let bombs = 0;
            for(let j=-3; j<=3; j+=3)
            {
                console.log(j);
                
                for(let i=0; i<3; i++)
                {
                    if(spot+j>=0 && spot+j<=8)
                    {
                        if(i==0)
                        {
                            if( spot+(j-1)>0 && (squares[spot+(j-1)]=='💣' || squares[spot+(j-1)]=='💥') )
                            {
                                bombs++;
                            }
                        }
                        if(i==1)
                        {
                            if( spot+j && (squares[spot+j]=='💣' || squares[spot+j]=='💥') )
                            {
                                bombs++;
                            }
                        }
                        if(i==2)
                        {
                            if( spot+(j+1) && (squares[spot+(j+1)]=='💣' || squares[spot+(j+1)]=='💥') )
                            {
                                bombs++;
                            }
                        }
                    }
                }
            }
            console.log(squares);
            let aux = squares;
            aux[spot]=String(bombs);
            setSquares(aux);
            console.log(squares);
            setClick(!click);
        }
        else
        {
            if( squares[spot]=='💣' && winner=='none' )
            {
                console.log(squares);
                let aux = squares;
                aux[spot]='💥';
                setSquares(aux);
                console.log(squares);
                setClick(!click);
            }
        }
    }

    const startGame = () =>
    {
        setStart(true);
        let aux = [ '', '', '', '', '', '', '', '', '',  ];
        let c = 0;
        while( c<3 )
        {
            let here = Math.floor( Math.random() * ( 8 - 0 + 1 ) + 0 );
            if(aux[here]=='')
            {
                aux[here]='💣';
                c++;
            }
        }
        setSquares(aux);        
    }

    useEffect( () =>
    {
        setSquares(squares);        
    }, [click])
        
    return(
        <div>
            <Link to='/home'>
                <button> {"<"} </button>
            </Link>

            <main>
                {start && GRID.map( i => 
                <div key={i}  className="verde" onClick={ () => makeAmove(i) }>
                    {squares[i]=='💣'?'':squares[i]}
                </div> )}
                {!start && GRID.map( i => 
                <div key={i}  className="rojo" >
                    {sign[i]}
                </div> )}
            </main>

            <div>
                {!start && <button onClick={startGame}> START </button>}
                {start && <button onClick={()=> setStart(!start)}> STOP </button>}
                <button onClick={()=>console.log(squares)}> sq </button>
            </div>

        </div>
    )
}