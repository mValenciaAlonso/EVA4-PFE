import React, { useState, useEffect } from 'react';
import FormularioLibro from './componentes/FormularioLibros';
import ListaLibros from './componentes/ListaLibros';
import './style.css';




function App() {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const librosGuardados = JSON.parse(localStorage.getItem('items')) || [];
        setLibros(librosGuardados);
    }, []);

    const agregarLibro = (libro) => {
        if (libros.some(l => l.clave1 === libro.clave1)) {
            alert('Clave duplicada');
            return;
        }
        const librosActualizados = [...libros, libro];
        setLibros(librosActualizados);
        localStorage.setItem('items', JSON.stringify(librosActualizados));
    };

    const actualizarLibro = (libroActualizado) => {
        const librosActualizados = libros.map(l => (l.clave1 === libroActualizado.clave1 ? libroActualizado : l));
        setLibros(librosActualizados);
        localStorage.setItem('items', JSON.stringify(librosActualizados));
    };

    const eliminarLibro = (clave1) => {
        const librosActualizados = libros.filter(l => l.clave1 !== clave1);
        setLibros(librosActualizados);
        localStorage.setItem('items', JSON.stringify(librosActualizados));
    };

    return (
        <div className="container">
            <h1>Biblioteca</h1>
            <FormularioLibro  agregarLibro={agregarLibro} />
            <ListaLibros libros={libros} actualizarLibro={actualizarLibro} eliminarLibro={eliminarLibro} />
        </div>
    );
}

export default App;
