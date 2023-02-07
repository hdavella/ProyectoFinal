import React from 'react';

const HomePage = (props) => {
    return (
        <main className="holder">
            <div className="imgcentro"><img src="img/logo.jpg" width="350" alt="chip" /></div>
            <div className="columnas">
                <section className="bienvenidos">
                    <h2>Bienvenidos</h2>
                    <p>
                        Somos una empresa especializada en reparación y reprogramación de modulos electrónicos del automotor
                    </p>
                    <p>
                        Realizamos banqueo de módulos del automotor para verificar el correcto funcionamiento ante una repración o ante fallas
                    </p>
                </section>
                <section className="testimonios">
                    <h2>Testimonios</h2>
                    <div className="testimonio">
                        <span className="cita">Excelente Servicio</span>
                        <span className="autor">Adrian Suarez - Mecanica integral Escalada</span>
                    </div>
                </section>
            </div>
        </main>

    );
}
export default HomePage;