import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TrabajoItem from '../components/trabajos/TrabajoItem';
import "../styles/trabajosPage.css";


const TrabajosPage = (props) => {

  const [loading, setLoading] = useState(false);
  const [trabajos, setTrabajos] = useState([]);

  useEffect( ()=>{
    const cargarTrabajos = async ()=>{
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/trabajos');
      setTrabajos(response.data);
      setLoading(false);
    };
    cargarTrabajos();
  }, []);

  return(
    <section className='holder'>
      <h2>Trabajos</h2>
      {
        loading ? (
        <p>Cargando...</p>
        ):(
          trabajos.map(item => <TrabajoItem key={item.id} title={item.titulo} subtitle={item.subtitulo} imagen={item.imagen} body={item.descripcion} />
            

            )
          )
      }
    </section> 

    );
}
export default TrabajosPage;