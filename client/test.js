// Comportamiento de .push

/*
let a = [ ];
a.push(1);
a.push(2);
console.log(a);
*/

// copia de seguridad, mecanica de disparo

/*
if(Number(player[1])+1<mapa[0].length && mapa[Number(player[0])][Number(player[1])+1]!='-')
                    {
                        let bulletAt = [ player[0], Number(player[1])+1 ];
                        let c = 0;
                        let shootIt = setInterval( () =>
                        {
                            if(c==0)
                            {
                                let aux = mapa;
                                aux[Number(bulletAt[0])][Number(bulletAt[1])]="→";
                                setMapa(aux);
                                c++;
                            }
                            else
                            {
                                if(Number(bulletAt[1])+c<mapa[0].length && mapa[Number(bulletAt[0])][Number(bulletAt[1])+c]=='')
                                {
                                    let aux = mapa;
                                    aux[Number(bulletAt[0])][Number(bulletAt[1])+(c-1)]='';
                                    aux[Number(bulletAt[0])][Number(bulletAt[1])+c]="→";
                                    c++;
                                    setMapa(aux);
                                }
                                else
                                {
                                    let aux = mapa;
                                    aux[Number(bulletAt[0])][Number(bulletAt[1])+(c-1)]='';
                                    c++;
                                    setMapa(aux);
                                    clearInterval(shootIt);
                                    console.log("despues del clear")
                                }
                            }
                            c%2==0 && setClick(false);
                            c%2!=0 && setClick(true);
                            console.log("teoricamente esta ", click)
                        }, 50)
                    }
*/

// LLenar/cambiar varias posiciones de un Array al mismo tiempo.

/*
let a = [ [1, 2], [3, 4], [5, 6] ];
a[0][0], a[2][0] = Array(2).fill('-');
console.log(a[0][0], a[2][0]);
*/

// Array.push(array)

/*
let a = [ [1, 2] ];
a.push( [3, 4] );
console.log( a[0], a[1] );
*/

// includes

/*
let a = [ [1, 2] , [2, 3], [3, 4] ];
console.log( a[0].includes( 1 ) && a[0].includes( 2 ) );
*/

// Array == Array

/*
let a = [ 1, 2 ];
let b = [ 1, 2 ];
let c = [ 2, 1 ];
let d = [ 5, 5 ];

console.log( a[0] == b[0] && a[1] == b[1] ); // true
console.log( a == b ); //   false
console.log( a == c ); //   false
console.log( a == d ); //   false
*/

// Push a un array de arrays

/*
let a = [ [ 1, 2 ], [ 3, 4 ] ];
console.log(a);
a.push( [ 5, 6 ] );
console.log(a[0], a[1], a[2]);
*/

// Math.floor

/*
console.log( Math.floor(19*.4) )
console.log( Math.ceil(19*.4) )
*/

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

// Math.floor( Math.random() * ( MAX - MIN + 1 ) + MIN ); <-- Fórmula base.
*/