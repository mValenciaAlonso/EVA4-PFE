import React, { useState } from 'react';
import { Table, Button,} from 'reactstrap';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/light.css';

toastConfig({ theme: 'light' });

// eslint-disable-next-line react/prop-types
function ListaLibros({ libros, actualizarLibro, eliminarLibro }) {
    const [editando, setEditando] = useState(null);

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

    };

    const eliminarLibroConMensaje = (clave1) => {
        eliminarLibro(clave1);

    };

    return (
        <>

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
                                <Button color="success" onClick={() => {
                                    guardarEdicion();
                                    toast('Tu edición ha sido guardada!');
                                }}>
                                    Guardar
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        setEditando(null);
                                        toast('Tu edición ha sido cancelada!');
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={libro.clave1}>
                            <td>{libro.clave1}</td>
                            <td>{libro.clave2}</td>
                            <td>{libro.clave3}</td>
                            <td>{libro.clave4}</td>
                            <td>
                                <Button
                                    color="warning"
                                    onClick={() => {
                                        setEditando(libro);
                                        toast('Estás editando el libro!');
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => {
                                        eliminarLibroConMensaje(libro.clave1);
                                        toast('El libro ha sido eliminado!');
                                    }}
                                >
                                    Eliminar
                                </Button>
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
