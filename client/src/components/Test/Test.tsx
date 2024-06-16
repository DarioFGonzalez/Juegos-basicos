import { useState } from 'react';
import './Test.css';

export const Test = () =>
{
    const [ mapa, setMapa ] = useState( Array.from( {length: 9}, ()=> Array.from( Array(9), ()=>'' ) ) );
    const [ startId, setStartId ] = useState( 0 );
    const [ player, setPlayer ] = useState ( [ 0, 0, "^" ] );
    const [ click, setClick ] = useState( true );

    const startGame = () =>
    {
        loadMap();
        let thisGameId = setInterval( () =>
        {
            shootAnAsteroid();
        }, 1000);

        setStartId( thisGameId );
    }

    const loadMap = () =>
    {
        let aux = mapa;
        aux[2][1] = '^';
        // [ aux[1][0], aux[1][2], aux[3][3] ] = Array(3).fill('-');    //Paredes
        // [ aux[7][3], aux[5][5], aux[8][1], aux[3][0], aux[4][2], aux[8][8] ] = Array(6).fill('🌑'); 
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
            let here = [ 0, 0 ];
            let symbol = '^';
            mapa.forEach( (fila, y) => fila.map( (celda, z) =>
            {
                if(celda=='v' || celda=="^" || celda=="<" || celda==">" ) { here=[ y, z ]; symbol=celda; }
            } ));
            let playerLocation = [ here[0], here[1], symbol ];
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
            shootMechanic(playerLocation, movimiento, true);
            // if
            // (
            //     (Number(player[1]) + Number(movimiento[1]) < mapa[0].length && Number(player[1]) + Number(movimiento[1]) >= 0) &&   //check horizontal
            //     (Number(player[0]) + Number(movimiento[0]) < mapa.length && Number(player[0]) + Number(movimiento[0]) >= 0) &&      //check vertical
            //     (mapa[Number(player[0]) + Number(movimiento[0])][Number(player[1]) + Number(movimiento[1])]!='-' ||                 //check for a wall
            //     mapa[Number(player[0]) + Number(movimiento[0])][Number(player[1]) + Number(movimiento[1])]=='🌑' )                  //check for an enemy
            // )
            // {
            //     let bulletAt = [ Number(player[0]) + Number(movimiento[0]), Number(player[1]) + Number(movimiento[1]) ];
            //     let c = 0;
            //     let shootIt = setInterval( () =>
            //     {
            //         if(c==0)
            //         {
            //             let aux = [...mapa];
            //             console.log(aux[bulletAt[0]][bulletAt[1]]);
            //             if(aux[bulletAt[0]][bulletAt[1]]=="🌑")
            //             {
            //                 aux[bulletAt[0]][bulletAt[1]] = '💥';
            //                 setMapa(aux);
            //                 c++;
            //                 clearInterval(shootIt);
            //                 setTimeout( () =>
            //                 {
            //                     let auxiliar = [ ...mapa];
            //                     auxiliar[bulletAt[0]][bulletAt[1]] = '';
            //                     setMapa(auxiliar);
            //                 }, 150);
            //             }
            //             else
            //             {
            //                 aux[bulletAt[0]][bulletAt[1]] = String(movimiento[2]);
            //                 setMapa(aux);
            //                 c++;
            //             }
            //         }
            //         else
            //         {
            //             if
            //             (
            //                 (Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) < mapa.length && Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) >= 0) &&
            //                 (Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) < mapa[0].length && Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) >= 0) &&
            //                 (mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]=='' ||
            //                 mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]=='🌑')
            //             )
            //             {
            //                 let aux = mapa;
            //                 let objective = mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )];
            //                 if(objective=='')
            //                 {
            //                     if(movimiento[0]!=0)
            //                     {
            //                         aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
            //                         aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = String(movimiento[2]);
            //                         c++;
            //                         setMapa(aux);
            //                     }
            //                     else
            //                     {
            //                         if(movimiento[1]!=0)
            //                         {
            //                             aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]='';
            //                             aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ]= String(movimiento[2]);
            //                             c++;
            //                             setMapa(aux);
            //                         }
            //                     }
            //                 }
            //                 else
            //                 {
            //                     if(objective=='🌑')
            //                     {
            //                         if(movimiento[0]!=0)
            //                         {
            //                             aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
            //                             aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = "💥";
            //                             boomAnimation( bulletAt[0], c, movimiento[0] ,bulletAt[1], 1 );
            //                             c++;
            //                             setMapa(aux);
            //                             clearInterval(shootIt);
            //                         }
            //                         else
            //                         {
            //                             if(movimiento[1]!=0)
            //                             {
            //                                 aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]='';
            //                                 aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ]= "💥";
            //                                 boomAnimation( bulletAt[0], c, movimiento[1] ,bulletAt[1], 2 );
            //                                 c++;
            //                                 setMapa(aux);
            //                                 clearInterval(shootIt);
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //             else
            //             {
            //                 let aux = mapa;
            //                 if(movimiento[0]!=0)
            //                 {
            //                     aux[Number(bulletAt[0]) + ( (c - 1) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
            //                     c++;
            //                     setMapa(aux);
            //                     clearInterval(shootIt);
            //                 }
            //                 else
            //                 {
            //                     if(movimiento[1]!=0)
            //                     {
            //                         aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( (c - 1) * Number(movimiento[1]) )]='';
            //                         c++;
            //                         setMapa(aux);
            //                         clearInterval(shootIt);
            //                     }
            //                 }
            //             }
            //         }
            //         c%2==0 && setClick(false);
            //         c%2!=0 && setClick(true);
            //         console.log("teoricamente esta ", click)
            //     }, 50)
            // }
        }
    }

    const shootMechanic = (startingPoint: any, movimiento: any, aShoot: boolean) =>
    {
        let to = mapa[Number(startingPoint[0]) + Number(movimiento[0])][Number(startingPoint[1]) + Number(movimiento[1])];
        if
            (
                (Number(startingPoint[1]) + Number(movimiento[1]) < mapa[0].length && Number(startingPoint[1]) + Number(movimiento[1]) >= 0) && //check horizontal
                (Number(startingPoint[0]) + Number(movimiento[0]) < mapa.length && Number(player[0]) + Number(movimiento[0]) >= 0) &&           //check vertical
                to!='-'
            )
            {
                let bulletAt = [ Number(startingPoint[0]) + Number(movimiento[0]), Number(startingPoint[1]) + Number(movimiento[1]) ];
                let c = 0;
                let shootIt = setInterval( () =>
                {
                    let aux = [...mapa];
                    if(c==0)
                    {
                        let target = aux[bulletAt[0]][bulletAt[1]];
                        if( target=="🌑" || target=='>' || target=='<' || target=='^' || target=='v' )
                        {
                            aux[bulletAt[0]][bulletAt[1]] = '💥';
                            setMapa(aux);
                            c++;
                            setTimeout( () =>
                            {
                                let auxiliar = [ ...mapa];
                                auxiliar[bulletAt[0]][bulletAt[1]] = '';
                                setMapa(auxiliar);
                            }, 150);
                            clearInterval(shootIt);
                        }
                        else
                        {
                            aux[bulletAt[0]][bulletAt[1]] = String(movimiento[2]);
                            setMapa(aux);
                            c++;
                        }
                    }
                    else
                    {
                        if
                        (
                            (Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) < mapa.length && Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) >= 0) &&
                            (Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) < mapa[0].length && Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) >= 0) &&
                            mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]!='-'
                        )
                        {
                            let objective = mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )];
                            let aux = [ ...mapa];
                            if(objective=='')
                            {
                                if(movimiento[0]!=0)
                                {
                                    if( aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='' ||
                                        aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='💥' )
                                    {
                                        c++;
                                        clearInterval(shootIt);
                                    }
                                    else
                                    {
                                        aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])] = '';
                                        aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = String(movimiento[2]);
                                        c++;
                                        setMapa(aux);
                                    }
                                }
                                else
                                {
                                    if(movimiento[1]!=0)
                                    {
                                        if( aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='' ||
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='💥')
                                        {
                                            c++;
                                            clearInterval(shootIt);
                                        }
                                        else
                                        {
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )] = '';
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ] = String(movimiento[2]);
                                            c++;
                                            setMapa(aux);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( objective=='🌑' || (objective=='>' || objective=='<' || objective=='^' || objective=='v') )
                                {
                                    if(movimiento[0]!=0)
                                    {
                                        if( aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='' ||
                                            aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='💥' )
                                        {
                                            c++;
                                            clearInterval(shootIt);
                                        }
                                        else
                                        {
                                            console.log("Entré a contacto con luna o player 1");
                                            aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                            aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = "💥";
                                            boomAnimation( bulletAt[0], c, movimiento[0] ,bulletAt[1], 1 );
                                            c++;
                                            setMapa(aux);
                                            clearInterval(shootIt);
                                        }
                                    }
                                    else
                                    {
                                        if(movimiento[1]!=0)
                                        {
                                            if( aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='' ||
                                                aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='💥')
                                            {
                                                c++;
                                                clearInterval(shootIt);
                                            }
                                            else
                                            {
                                                console.log("Entré a contacto con luna o player 2");
                                                aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )] = '';
                                                aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ] = "💥";
                                                boomAnimation( bulletAt[0], c, movimiento[1] ,bulletAt[1], 2 );
                                                c++;
                                                setMapa(aux);
                                                clearInterval(shootIt);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            let aux = [...mapa];
                            if(movimiento[0]!=0)
                            {
                                console.log("pasé por acá")
                                aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
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
                }, aShoot ? 50 : 1500 );
            }
    }

    const shootAnAsteroid = () =>
    {
        let random8 = Math.floor( Math.random() * ( 8 - 0 + 1 ) + 0 );
        let direction = Math.floor( Math.random() * ( 4 - 1 + 1 ) + 1 );
        let startingPoint = [ 0, 0 ];
        let movimiento = [ 0, 0, '🌑' ];
        switch(direction)
        {
            case 1: //>
                startingPoint = [ random8, 0 ];
                movimiento = [ 0, 1, '🌑' ];
                break;
            case 2: //<
                startingPoint = [ random8, 8 ];
                movimiento = [ 0, -1, '🌑' ];
                break;
            case 3: //v
                startingPoint = [ 0, random8 ];
                movimiento = [ 1, 0, '🌑' ];
                break;
            case 4: //^
                startingPoint = [ 8, random8 ];
                movimiento = [ -1, 0, '🌑'  ];
                break;
        }
        shootMechanic( startingPoint, movimiento, false );
    }

    const boomAnimation = ( bulletAt0: number, c: number, movimiento: any, bulletAt1: number , interaction: number) =>
    {
        let aux = [ ...mapa ];
        setTimeout( () =>
        {
            if(interaction == 1)
            {
                aux[Number(bulletAt0) + ( c * Number(movimiento) ) ][Number(bulletAt1)] = '';
            }
            if(interaction == 2)
            {
                aux[Number(bulletAt0)][Number(bulletAt1) + ( c * Number(movimiento) ) ] = '';
            }
            setMapa(aux);
            setClick(true);
            setClick(false);
        }, 100);
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