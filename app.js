//visualiza en el DOM como sifuera un evento
document.addEventListener('DOMContentLoaded',()=>{
    fetchData()
})


//crear la funcion para hacer la peticion fetch

const fetchData = async()=>{

    const url = 'http://localhost:3050/product';

    try
    {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        //visualiza las imagenes en el dom
        pintarProductos(data);
        detectarBotones(data);


    }
    catch(error)
    {
        console.log(error);

    }
}

//se usa el id principal
const contenedorProductos = document.querySelector('#contenedor-productos');

                //recibir la data 
const pintarProductos = (data)=>{
    //se inicializa el template                                  //captura el contenido template
    const template = document.querySelector('#template-productos').content
    //se crea el fragment
    const fragment = document.createDocumentFragment()
    //recorrer la data
     data.forEach(producto=>{
        //capturar el src con js //si no esta creado lo crea y si esta creado se usa
        template.querySelector('img').setAttribute('src',producto.url_image)
        template.querySelector('h5').textContent = producto.name
        template.querySelector('p span').textContent = producto.price
        //data set
        template.querySelector('button').dataset.id = producto.id

    //despues a que clonar el template 
    const clone = template.cloneNode(true);
    //usamos el fragment //contenedor hijo
    fragment.appendChild(clone);
    })

    //se usa el contenedor principal y se agrega el fragmento
    contenedorProductos.appendChild(fragment)

}

let carrito = {}
                    //recibir para comparar informacion en la bd
const detectarBotones = (data)=>{
                            //seleccionar todos los elementos
        const botones = document.querySelectorAll('.card button')
        //visualiza el arreglo botones
        console.log(botones)
        botones.forEach(btn=>{
            btn.addEventListener('click',()=>{
                console.log(btn.dataset.id)
                            //el triple es igual esta leyend un entero
                //obtenemos el objeto              //con un string y a que tranformarlo
                const producto = data.find(item =>item.id === parseInt(btn.dataset.id))
                producto.cantidad =1;
                if(carrito.hasOwnProperty(producto.id))
                {
                    producto.cantidad = carrito[producto.id].cantidad + 1;

                }
                //el objeto se esta volviendo a incorporar es decir se esa agregando
                                    //copia producto
                carrito[producto.id]={...producto}
                console.log('carrito' + carrito)
                pintarCarrito()
            })
        })

}



//pinta la informacion de los items
const items = document.querySelector('#items')
const pintarCarrito = ()=>{
//pendiente innerhtml
    
    items.innerHTML = ''

    //preguntar la cantidad de productos//con las keys el indice
    // por ser dinamico por el return no hace toda la operacion
    if(Object.keys(carrito).length === 0)
    {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - con InnerHTML!</th>'
        return 

    }

        const fila = document.querySelector('#fila');
      
        const template = document.querySelector('#template-carrito').content
        //crear fragmento
        const fragment = document.createDocumentFragment()
     //el objeto se tranforma en arreglo   
    Object.values(carrito).forEach(producto=>{
        console.log('producto' + producto)

        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.name
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector(' span').textContent = producto.price * producto.cantidad


        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true);
        fragment.appendChild(clone)

       

        
    })
    items.appendChild(fragment)
    pintarFooter()
    accionesBotones()
}

//footer del carrito
const footer = document.querySelector('#footer-carrito')
const pintarFooter = ()=>{
    footer.innerHTML = ''
    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    //sumar cantidad                                //acumulandor,propiedad y la accion   
   const nCantidad=  Object.values(carrito).reduce((acc,{cantidad})=>acc + cantidad,0)
   const nPrecio = Object.values(carrito).reduce((acc,{cantidad,price})=>acc + cantidad * price,0)
  
   template.querySelectorAll('td')[0].textContent = nCantidad
   template.querySelector('span').textContent = nPrecio
   const clone = template.cloneNode(true)
   fragment.appendChild(clone)
   footer.appendChild(fragment)

   const boton = document.querySelector('#vaciar-carrito')
   boton.addEventListener('click',()=>{
       carrito = {}
       pintarCarrito()
   })

}

//botonnes 
const  accionesBotones = ()=>{

    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')
    botonesAgregar.forEach(btn=>{
        btn.addEventListener('click',()=>{
            console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = {...producto}
            pintarCarrito()
        })
    })

   

    botonesEliminar.forEach(btn=>{
        btn.addEventListener('click',()=>{
            console.log('eliminando')
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if( producto.cantidad ===0)
            {
                delete carrito[btn.dataset.id]

            }
            else
            {
                carrito[btn.dataset.id] = {...producto}
                

            }
            pintarCarrito()
            
        })
    })



}

//como se va a comportar el carrito de compra 
/*let carritoEjemplo = {}
carritoEjemplo = {
    5:{id:5,name:'ENERGETICA MR BIG',price:1490,cantidad:1}
}
*/
//boton- buscador 
