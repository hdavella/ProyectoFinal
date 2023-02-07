import React from 'react';
import "../styles/nosotrosPage.css"

const NosotrosPage = (props) => {
    return(
        <main class="holder">
    <div className="historia">
      <h2>Historia</h2>
      <p>
        Somos una empresa familiar que desde 1983 nos dedicamos a la mecánica, en los comienzos dedicados a
        la mecánica convencional pero con el avance de la electrónica en los automovíbiles nos inclinamos por este
        maravilloso universo.
        Con el tiempo adquirimos experiencia en los diferentes módulos, primero de inyección y luego con el resto
        hasta conformar toda la electrónica que se encuentra hoy en los automóviles modernos.
      </p>
      <p>Actualmente contamos con un moderno laboratorio para reparación y prueba de los módulos electrónicos
        Contamos con diversos escaners para las diferentes marcas y los diferentes sistemas, tanto de inyección,
         confort, sistemas de frenado y diagnósticoi de airbags, garantizando así que los trabajos se completen
         en forma profesional y sin retrasar al cliente.
      </p>
    </div>
    <div className="staff">
      <h2>Staff</h2>
      <div className="personas">
        <div className="persona">
          <img src="img/nosotros1.jpg" alt="Juan Gomez"/>
          <h5>Hernan Rossi</h5>
          <h6>Gerente General</h6>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            A maiores beatae corrupti unde, aliquam aut voluptate culpa numquam quia vitae porro illum.
            Nam, veritatis odio praesentium recusandae nostrum aperiam numquam.
          </p>
        </div>

        <div className="persona">
          <img src="img/nosotros2.jpg" alt="Diana Reyes"/>
          <h5>Mariano Virgil</h5>
          <h6>Gerente Comercial</h6>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            A maiores beatae corrupti unde, aliquam aut voluptate culpa numquam quia vitae porro illum.
            Nam, veritatis odio praesentium recusandae nostrum aperiam numquam.
          </p>
        </div>

        <div className="persona">
          <img src="img/nosotros3.jpg" alt="Roberto Zaptos"/>
          <h5>Gustavo Diguon</h5>
          <h6>Especialista</h6>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            A maiores beatae corrupti unde, aliquam aut voluptate culpa numquam quia vitae porro illum.
            Nam, veritatis odio praesentium recusandae nostrum aperiam numquam.
          </p>
        </div>
      </div>
    </div>
  </main>
    );
}
export default NosotrosPage;