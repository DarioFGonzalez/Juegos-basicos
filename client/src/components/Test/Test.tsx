import { useEffect, useState } from 'react';
import './Test.css';

export const Test = () =>
{
    const [ mapa, setMapa ] = useState( Array.from( {length: 9}, ()=> Array.from( Array(9), ()=>'' ) ) );
    const [ startId, setStartId ] = useState( 0 );
    const [ player, setPlayer ] = useState ( [ 0, 0, "^" ] );
    const [ click, setClick ] = useState( true );

    // useEffect( () => 
    // {
    //     let aux = mapa;
    //     setMapa(aux);        
    // }, [click])

    const startGame = () =>
    {
        loadMap();
        let thisGameId = setInterval( () =>
        {
            console.log("HOLA");
        }, 1000);

        setStartId( thisGameId );
    }

    const loadMap = () =>
    {
        let aux = mapa;
        aux[2][1] = '^';
        [ aux[1][0], aux[1][2] ] = Array(2).fill('-'); 
        setMapa(aux);
    }

    const handleMovement = (event: React.KeyboardEvent) =>
    {
        let here = [ 0, 0 ];
        let symbol = '^';
        mapa.forEach( (fila, y) => fila.map( (celda, z) =>
        {
            if(celda=='v' || celda=="^" || celda=="<" || celda==">" ) { here=[ y, z ]; symbol=celda; }
        } ));
        setPlayer( [ here[0], here[1], symbol ] );

        switch(event.key)
        {
            case 'W':
            case 'w':
                if(here[0]-1>=0 && mapa[here[0]-1][here[1]]=='')
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='';
                    aux[here[0]-1][here[1]]='^';
                    setPlayer( [ here[0]-1, here[1], "^" ] );
                    setMapa(aux);
                }
                else
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='^';
                    setPlayer( [ here[0], here[1], "^" ] );
                    setMapa(aux);
                }
                break;
            case 'A':
            case 'a':
                if(here[1]-1>=0 && mapa[here[0]][here[1]-1]=='')
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='';
                    aux[here[0]][here[1]-1]='<';
                    setPlayer( [ here[0], here[1]-1, '<' ] );
                    setMapa(aux);
                }
                else
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='<';
                    setPlayer( [ here[0], here[1], '<' ] );
                    setMapa(aux);
                }
                break;
            case 'S':
            case 's':
                if(here[0]+1<mapa.length && mapa[here[0]+1][here[1]]=='')
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='';
                    aux[here[0]+1][here[1]]='v';
                    setPlayer( [ here[0]+1, here[1], 'v' ] );
                    setMapa(aux);
                }
                else
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='v';
                    setPlayer( [ here[0], here[1], 'v' ] );
                    setMapa(aux);
                }
                break;
            case 'D':
            case 'd':
                if(here[1]+1<mapa[0].length && mapa[here[0]][here[1]+1]=='')
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='';
                    aux[here[0]][here[1]+1]='>';
                    setPlayer( [ here[0], here[1]+1, ">" ] );
                    setMapa(aux);
                }
                else
                {
                    let aux = mapa;
                    aux[here[0]][here[1]]='>';
                    setPlayer( [ here[0], here[1], ">" ] );

                    setMapa(aux);
                }
                break;
            default:
                break;
        }
    }

    const shoot = (event: React.KeyboardEvent) =>
    {
        if(event.key==' ')
        {
            console.log(player)
            let movimiento = [ 0, 0, "→" ];
            switch(player[2])
            {
                case '>':
                    movimiento = [ 0, 1, "→" ];
                    break;
                case '<':
                    movimiento = [ 0, -1, "←" ];
                    break;
                case 'v':
                    movimiento = [ 1, 0, "↓" ];
                    break;
                case '^':
                    movimiento = [ -1, 0, "↑" ];
                    break;
            }
            if
            (
                (Number(player[1]) + Number(movimiento[1]) < mapa[0].length && Number(player[1]) + Number(movimiento[1]) >= 0) &&   //check horizontal
                (Number(player[0]) + Number(movimiento[0]) < mapa.length && Number(player[0]) + Number(movimiento[0]) >= 0) &&      //check vertical
                mapa[Number(player[0]) + Number(movimiento[0])][Number(player[1]) + Number(movimiento[1])]!='-'                         //check for a wall
            )
            {
                let bulletAt = [ Number(player[0]) + Number(movimiento[0]), Number(player[1]) + Number(movimiento[1]) ];
                let c = 0;
                let shootIt = setInterval( () =>
                {
                    if(c==0)
                    {
                        let aux = mapa;
                        aux[bulletAt[0]][bulletAt[1]] = String(movimiento[2]);
                        setMapa(aux);
                        c++;
                    }
                    else
                    {
                        if
                        (
                            (Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) < mapa.length && Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) >= 0) &&
                            (Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) < mapa[0].length && Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) >= 0) &&
                            mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]==''
                        )
                        {
                            let aux = mapa;
                            if(movimiento[0]!=0)
                            {
                                console.log(bulletAt)
                                aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = String(movimiento[2]);
                                c++;
                                setMapa(aux);
                            }
                            else
                            {
                                if(movimiento[1]!=0)
                                {
                                    aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]='';
                                    aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ]= String(movimiento[2]);
                                    c++;
                                    setMapa(aux);
                                }
                            }
                        }
                        else
                        {
                            let aux = mapa;
                            if(movimiento[0]!=0)
                            {
                                aux[Number(bulletAt[0]) + ( (c - 1) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                c++;
                                setMapa(aux);
                                clearInterval(shootIt);
                            }
                            else
                            {
                                if(movimiento[1]!=0)
                                {
                                    aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( (c - 1) * Number(movimiento[1]) )]='';
                                    c++;
                                    setMapa(aux);
                                    clearInterval(shootIt);
                                }
                            }
                        }
                    }
                    c%2==0 && setClick(false);
                    c%2!=0 && setClick(true);
                    console.log("teoricamente esta ", click)
                }, 50)
            }
        }
    }

    const stopGame = () =>
    {
        clearInterval( startId );
        setStartId( 0 );
    }

    return(
        <div >
            <div className='columna' onKeyDown={handleMovement} onKeyPress={shoot} tabIndex={0}>

                {mapa.map( ( fila, x ) =>
                <div key={x} className='fila'>
                    {fila.map( ( celda, y ) =>
                    <label key={y} className='celda' >
                        {celda}
                    </label>)}
                </div> )}

            </div>
            {startId==0 && <button onClick={startGame}> START </button>}
            {startId!=0 && <button onClick={stopGame}> STOP </button>}
            <button onClick={()=>console.log(player)}> PLAYER </button>
        </div>
    )
}