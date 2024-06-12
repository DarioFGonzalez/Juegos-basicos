import { useState } from "react"
import { Link } from "react-router-dom";
import Styles from './Buscaminas.module.css';

export const Buscaminas = () =>
{
    const [ mapa, setMapa ] = useState( Array.from( {length: 9}, () => Array.from( Array(9), ()=> '' ) ) ); 
    const [ start, setStart ] = useState<boolean>( false );
    const [ endGame, setEndGame ] = useState( false );
    const [ message, setMessage ] = useState( '' );
    const [ difficulty, setDifficulty ] = useState(1);
    let sign = Array.from( {length: 9}, () => Array.from( Array(9), ()=> '' ) );
    sign[1][0]='Busca';
    sign[1][1]='💣';
    sign[1][2]='Minas';

    const markIt = ( linea: number, posicion: number, e: React.MouseEvent<HTMLDivElement> ) =>
    {
        const isRightClick = e.nativeEvent.button === 2 || e.nativeEvent.which === 3;
        console.log(`mapa[${linea}][${posicion}] = ${mapa[linea][posicion]}`)

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
                if( i==-1 && linea+i>=0 || i==0 || i==1 && linea+i<mapa.length )
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
        for(let i=0; i<mapa.length; i++)
        {
            for(let j=0; j<mapa[0].length; j++)
            {
                if( MapaActualizado[i][j]=='' || MapaActualizado[i][j]=='⚪🚩' )
                {
                    result = false;
                }
            }
        }
        console.log(MapaActualizado);
        
        result && setMessage( '¡Ganaste!' );
        result && setEndGame( true );
    }

    const startGame = (difficultad: number) =>
    {
        setMessage( '' );
        setStart(true);
        setEndGame(false);
        let bombs = 0;
        if(difficultad==1)
        {
            bombs=10;
            setDifficulty(1);
        }
        if(difficultad==2)
        {
            bombs=40;
            setDifficulty(2);
        }
        if(difficultad==3)
        {
            bombs=99;
            setDifficulty(3);
        }
        let aux = Array.from( {length: difficultad==1 ? 9 : difficultad==2 ? 16 : 16}, () => Array.from( Array(difficultad==1 ? 9 : difficultad==2 ? 16 : 30), ()=> '' ) );
        let c = 0;
        while( c < bombs )
        {
            let first = Math.floor( Math.random() * ( ( aux.length - 1 ) - 0 + 1 ) + 0 );
            let second = Math.floor( Math.random() * ( ( aux[1].length -1 ) - 0 + 1 ) + 0 )
            if(aux[first][second]=='')
            {
                aux[first][second]='💣';
                c++;
            }
        }
        console.log(`¡${bombs} Bombas plantadas! (${c}) Buena suerte`);
        
        setMapa(aux);        
    }

    return(
        <div>
            <Link to='/home'>
                <button> {"<"} </button>
            </Link>
            {message!='' && <h1> {message} </h1>}

            <div className={Styles.columna}>

                { (start && !endGame) && 
                mapa.map( (fila, y) =>
                    <div key={y} className={Styles.fila}>
                        {fila.map( (celda, z) =>
                        <label className={Styles.celda} onContextMenu={(e)=> {e.preventDefault(); markIt(y, z, e);} } onClick={(e)=> markIt(y, z, e)} key={z} >
                           { celda=='💣'  ? '' : celda=='💣🚩' || celda=='⚪🚩' ? '🚩' : celda }
                        </label>)}
                    </div>)}

            </div>

            <div>
                {/* {!start && <button onClick={startGame}> START </button>} */}
                {!start && <button onClick={()=>startGame(1)}> Fácil </button>}
                {!start && <button onClick={()=>startGame(2)}> Medio </button>}
                {!start && <button onClick={()=>startGame(3)}> Difícil </button>}

                {start && <button onClick={()=>setStart(false)}> STOP </button>}
                {endGame && <button onClick={()=>startGame(difficulty)}> RESTART </button>}
                <button onClick={ ()=>console.log( mapa ) }> MAPA </button>
            </div>
        </div>
    )
}