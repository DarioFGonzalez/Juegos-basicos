import { useState } from "react"
import { Link } from "react-router-dom";

export const Buscaminas = () =>
{
    const [ mapa, setMapa ] = useState( Array.from( {length: 3}, () => Array.from( Array(3), ()=> '' ) ) ); 
    const [ start, setStart ] = useState<boolean>( false );
    const [ endGame, setEndGame ] = useState( false );
    const [ message, setMessage ] = useState( '' );
    let sign = Array.from( {length: 3}, () => Array.from( Array(3), ()=> '' ) );
    sign[1][0]='Busca';
    sign[1][1]='💣';
    sign[1][2]='Minas';

    const markIt = ( linea: number, posicion: number, e: React.MouseEvent<HTMLDivElement> ) =>
    {
        const isRightClick = e.nativeEvent.button === 2 || e.nativeEvent.which === 3;

        if(isRightClick)
        {
            if( mapa[linea][posicion]=='' )
            {
                let aux = mapa.map( (w, x) => w.map( (y, z) => (x==linea && z==posicion) ? "⚪🚩" : y  ) );
                setMapa( aux );
            }
            if( mapa[linea][posicion]=='💣' )
            {
                let aux = mapa.map( (w, x) => w.map( (y, z) => (x==linea && z==posicion) ? "💣🚩" : y  ) );
                setMapa( aux );
            }
            if( mapa[linea][posicion]=='⚪🚩' )
            {
                let aux = mapa.map( (w, x) => w.map( (y, z) => (x==linea && z==posicion) ? "" : y  ) );
                setMapa( aux );
            }
            if( mapa[linea][posicion]=='💣🚩' )
            {
                let aux = mapa.map( (w, x) => w.map( (y, z) => (x==linea && z==posicion) ? "💣" : y  ) );
                setMapa( aux );
            }
        }
        else
        {
            if( mapa[linea][posicion]=='' )
            {
                let aux = mapa.map( (w, x) => w.map( (y, z) => (x==linea && z==posicion) ? checkAround(linea, posicion) : y  ) );
                setMapa( aux );
                checkForVictory(aux);
            }
            else
            {
                if( mapa[linea][posicion]=='💣' )
                {
                    let aux = mapa.map( (w, x) => w.map( (y, z) => (x==linea && z==posicion) ? '💥' : y  ) );
                    setMapa( aux );
                    setEndGame( true );
                    setMessage( '💥 ¡Perdiste! 💥' );
                }
            }
        }
    }

    const checkAround = ( linea: number, posicion: number ) =>
    {
        let bombsAround = 0;
        for(let i=-1; i<2; i++)
        {
            for(let j=-1; j<2; j++)
            {
                if( i==-1 && linea+i>=0 || i==0 || i==1 && linea+i<3 )
                {
                    if( mapa[linea+i][posicion+j]=='💣' || mapa[linea+i][posicion+j]=='💣🚩' )
                    {
                        bombsAround++;
                    }
                }
            }
        }
        return String(bombsAround);
    }

    const checkForVictory = ( MapaActualizado: any ) =>
    {
        let result = true;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if( MapaActualizado[i][j]=='' || MapaActualizado[i][j]=='⚪🚩' )
                {
                    result = false;
                }
            }
        }
        console.log(MapaActualizado);
        console.log("resultado: ",result);
        
        result && setMessage( '¡Ganaste!' );
        result && setEndGame( true );
    }

    const startGame = () =>
    {
        setMessage( '' );
        setStart(true);
        setEndGame(false);
        let aux = Array.from( {length: 3}, () => Array.from( Array(3), ()=> '' ) );
        let c = 0;
        while( c<3 )
        {
            let first = Math.floor( Math.random() * ( 2 - 0 + 1 ) + 0 );
            let second = Math.floor( Math.random() * ( 2 - 0 + 1 ) + 0 )
            if(aux[first][second]=='')
            {
                aux[first][second]='💣';
                c++;
            }
        }
        setMapa(aux);        
    }

    return(
        <div>
            <Link to='/home'>
                <button> {"<"} </button>
            </Link>
            {message!='' && <h1> {message} </h1>}

            <main>
                { !start && sign.map( (pos) => pos.map( (linea, y) => (
                <div key={y} >
                    {linea}
                </div> ) ) ) }

                { (start && !endGame) && mapa.map( (pos, z) => pos.map( (linea, y) => (
                <div key={y} onContextMenu={(e)=> {e.preventDefault(); markIt(z, y, e);} } onClick={(e)=> markIt(z, y, e)}>
                    { linea=='💣'  ? '' : linea=='💣🚩' || linea=='⚪🚩' ? '🚩' : linea }
                </div> ) ) ) }

                { (endGame && start) && mapa.map( (pos, z) => pos.map( (linea, y) => (
                <div key={y} >
                    {linea=='💣'? '' : linea}
                </div> ) ) ) }
            </main>

            <div>
                {!start && <button onClick={startGame}> START </button>}
                {start && <button onClick={()=>setStart(false)}> STOP </button>}
                {endGame && <button onClick={startGame}> RESTART </button>}
                <button onClick={()=>console.log( Number(mapa[1][1]) )}> MAPA </button>
                <button onClick={()=>console.log( mapa )}> MAPAa </button>
            </div>
        </div>
    )
}