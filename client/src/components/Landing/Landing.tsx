import { Link } from "react-router-dom"

export const Landing = () =>
{

    return(
        <div>
            Hola, soy la Landing page.
            <Link to='/home'>
                <button> HOME </button>
            </Link>
        </div>
    )
}