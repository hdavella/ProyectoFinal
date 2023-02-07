import React, {useState} from 'react';
import "../styles/contactoPage.css";
import axios from 'axios';

const ContactoPage = (props) => {

    const initialForm={
        nombre:'',
        email:'',
        telefono:'',
        mensaje:''
    };

    const[sending, setSending] = useState(false);
    const[msg, setMsg] = useState('');
    const[formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const {name,value} = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        const response = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if(response.data.error === false){
            setFormData(initialForm)
        };
    }

    return (
        <main className="holder contacto">
            <div>
                <h2>Contacto rápido</h2>
                <form action="/contacto" method="post" className="formulario" onSubmit={handleSubmit}>
                    <p>
                        <label for="nombre">Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="telefono">Teléfono</label>
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="mensaje">Mensaje</label>
                        <textarea name="mensaje" cols="30" rows="10" value={formData.mensaje} onChange={handleChange}></textarea>
                    </p>
                    <p>
                        <input type="submit" name="Enviar" />
                    </p>
                    {sending ? <p>Enviando...</p> : null}
                    {msg ? <p>{msg}</p> : null}
                </form>
            </div>
            <div className="datos">
                <h2>Otras vías de comunciación</h2>
                <p>Otros datos de contacto</p>
                <ul>
                    <li>Teléfono: 4444-5555</li>
                    <li>email: tumail@tudominio.com.ar</li>
                    <li>Fb:</li>
                    <li>TW</li>
                </ul>
            </div>
        </main>
    );
}
export default ContactoPage;