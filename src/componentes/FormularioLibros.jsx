// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

// eslint-disable-next-line react/prop-types
function FormularioLibro({ agregarLibro }) {
    const [libro, setLibro] = useState({ clave1: '', clave2: '', clave3: '', clave4: '' });
    const [mensaje, setMensaje] = useState('');

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setLibro({
            ...libro,
            [name]: value,
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        agregarLibro({ ...libro, clave1: parseInt(libro.clave1, 10) });
        setLibro({ clave1: '', clave2: '', clave3: '', clave4: '' });
        setMensaje('Libro Agregado');
        setTimeout(() => {
            setMensaje('');
        }, 3000); // El mensaje desaparecerá después de 3 segundos
    };

    return (
        <Form className="formulario-libro" onSubmit={manejarEnvio}>
            {mensaje && <Alert color="success">{mensaje}</Alert>}
            <FormGroup className="form-group">
                <Label for="clave1">ID:</Label>
                <Input type="number" name="clave1" value={libro.clave1} onChange={manejarCambio} required/>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="clave2">Título:</Label>
                <Input type="text" name="clave2" value={libro.clave2} onChange={manejarCambio} required/>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="clave3">Año:</Label>
                <Input type="text" name="clave3" value={libro.clave3} onChange={manejarCambio}/>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="clave4">Autor:</Label>
                <Input type="text" name="clave4" value={libro.clave4} onChange={manejarCambio} required/>
            </FormGroup>
            <div className="button-container">
                <Button type="submit" color="primary">Agregar Libro</Button>
            </div>
        </Form>
    );
}

export default FormularioLibro;
