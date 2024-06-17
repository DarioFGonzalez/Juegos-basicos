import { Link } from "react-router-dom"

export const Home = () =>
{

    return(
        <div>
            <h2>Hola! Acá se tienen que mostrar los juegos.</h2>
            <p> O por lo menos un resumen de todo lo que tiene la página</p>
            <Link to='/tateti'>
                <button> ❌ Ta-Te-Ti ⭕ </button>
            </Link>
            <Link to='/buscaminas'>
                <button> 💣 Buscaminas 💥 </button>
            </Link>
            <Link to='/space'>
                <button> 🌌 Space-Shooter 🚀 </button>
            </Link>
            <br/>
            <hr/>
            <br/>
            <Link to='/test'>
                <button> 🚧 TEST 🚧 </button>
            </Link>
        </div>
    )
}