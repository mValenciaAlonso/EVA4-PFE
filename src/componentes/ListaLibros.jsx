import React, { useState } from 'react';
import { Table, Button, Alert } from 'reactstrap';

function ListaLibros({ libros, actualizarLibro, eliminarLibro }) {
    const [editando, setEditando] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const manejarCambioEdicion = (e) => {
        const { name, value } = e.target;
        setEditando({
            ...editando,
            [name]: value,
        });
    };

    const guardarEdicion = () => {
        actualizarLibro({ ...editando, clave1: parseInt(editando.clave1, 10) });
        setEditando(null);
        setMensaje('Libro Editado');
        setTimeout(() => {
            setMensaje('');
        }, 3000); // El mensaje desaparecerá después de 3 segundos
    };

    const eliminarLibroConMensaje = (clave1) => {
        eliminarLibro(clave1);
        setMensaje('Libro Eliminado');
        setTimeout(() => {
            setMensaje('');
        }, 3000); // El mensaje desaparecerá después de 3 segundos
    };

    return (
        <>
            {mensaje && <Alert color="success">{mensaje}</Alert>}
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>TITULO</th>
                    <th>AÑO</th>
                    <th>AUTOR</th>
                    <th>ACCIONES</th>
                </tr>
                </thead>
                <tbody>
                {libros.map(libro => (
                    editando && editando.clave1 === libro.clave1 ? (
                        <tr key={libro.clave1}>
                            <td><input type="number" name="clave1" value={editando.clave1} disabled /></td>
                            <td><input type="text" name="clave2" value={editando.clave2} onChange={manejarCambioEdicion} /></td>
                            <td><input type="text" name="clave3" value={editando.clave3} onChange={manejarCambioEdicion} /></td>
                            <td><input type="text" name="clave4" value={editando.clave4} onChange={manejarCambioEdicion} /></td>
                            <td>
                                <Button color="success" onClick={guardarEdicion}>Guardar</Button>
                                <Button color="secondary" onClick={() => setEditando(null)}>Cancelar</Button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={libro.clave1}>
                            <td>{libro.clave1}</td>
                            <td>{libro.clave2}</td>
                            <td>{libro.clave3}</td>
                            <td>{libro.clave4}</td>
                            <td>
                                <Button color="warning" onClick={() => setEditando(libro)}>Editar</Button>
                                <Button color="danger" onClick={() => eliminarLibroConMensaje(libro.clave1)}>Eliminar</Button>
                            </td>
                        </tr>
                    )
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListaLibros;
