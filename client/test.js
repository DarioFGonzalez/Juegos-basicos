// prueba con nombres y variables

/*
let a1 = [ 0, 1, 2 ];
let a2 = [ 3, 4, 5 ];
let a3 = [ 6, 7, 8 ];

// for(let i=0; i<3; i++)
// {
//     console.log( a[i][1] );  //<-- approach "equivocado"
// }

let mapa = [ a1, a2, a3 ];

for(let i=0; i<3; i++)
{
    console.log(mapa[i][0]);
}
*/

// Buscar en una posición inexistente de un array

/*
let a = [ 0, 1, 2, "💣" , [ 0, 1, 2] ];
console.log( a[-2]=="💣", a[-1], a[0], a[1]==1, a[2], a[3]=='💣', a[4][0] );
*/

// array.length

/*
let a = [ 1, 2 ];
console.log( a.length );
for( let i=0; i<a.length; i++)
{
    console.log(i);
}
*/

// Número aleatorio entre 0 y 1

/*
for(let i=0; i<10; i++)
{
    console.log( Math.floor( Math.random() * ( 1 - 0 + 1 ) + 0 ) );
}
*/