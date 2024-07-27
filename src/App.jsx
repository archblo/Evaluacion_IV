import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [recetas, setRecetas] = useState([]);
  const [clave1, setClave1] = useState('');
  const [clave2, setClave2] = useState('');
  const [clave3, setClave3] = useState('true');
  const [clave4, setClave4] = useState('');
  const [editandoReceta, setEditandoReceta] = useState(null);

  useEffect(() => {
    const recetasAlmacenadas = JSON.parse(localStorage.getItem("recetas") || "[]");
    setRecetas(recetasAlmacenadas);
  }, []);

  const handleNuevaClave1 = (e) => setClave1(e.target.value);
  const handleNuevaClave2 = (e) => setClave2(e.target.value);
  const handleNuevaClave3 = (e) => setClave3(e.target.value);
  const handleNuevaClave4 = (e) => setClave4(e.target.value);

  const handleAgregarReceta = () => {
    if (recetas.find(receta => receta.clave1 === clave1)) {
      alert("El número ya existe. No se puede duplicar la clave.");
      return;
    }
    const nuevaReceta = { clave1, clave2, clave3: clave3 === 'true', clave4 };
    setRecetas(prev => {
      const nuevoArreglo = [...prev, nuevaReceta];
      localStorage.setItem("recetas", JSON.stringify(nuevoArreglo));
      return nuevoArreglo;
    });
    setClave1('');
    setClave2('');
    setClave3('true');
    setClave4('');
  };

  const handleEliminarReceta = (clave1) => {
    setRecetas(prev => {
      const resultadosEliminados = prev.filter(receta => receta.clave1 !== clave1);
      localStorage.setItem("recetas", JSON.stringify(resultadosEliminados));
      return resultadosEliminados;
    });
  };

  const handleEditarReceta = (receta) => {
    setEditandoReceta(receta);
    setClave1(receta.clave1);
    setClave2(receta.clave2);
    setClave3(receta.clave3 ? 'true' : 'false');
    setClave4(receta.clave4);
  };

  const handleGuardarEdicion = () => {
    setRecetas(prev => {
      const recetasActualizadas = prev.map(receta =>
        receta.clave1 === editandoReceta.clave1 ? { ...receta, clave1, clave2, clave3: clave3 === 'true', clave4 } : receta
      );
      localStorage.setItem("recetas", JSON.stringify(recetasActualizadas));
      return recetasActualizadas;
    });
    setEditandoReceta(null);
    setClave1('');
    setClave2('');
    setClave3('true');
    setClave4('');
  };

  const handleCancelarEdicion = () => {
    setEditandoReceta(null);
    setClave1('');
    setClave2('');
    setClave3('true');
    setClave4('');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="border border-primary p-5 rounded">
          <h1 className="text-center mb-4">¡Ingrese Su Receta Aqui!</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="clave1">Número de Receta</label>
              <input type="number" className="form-control" id="clave1" value={clave1} onChange={handleNuevaClave1} required />
            </div>
            <div className="form-group">
              <label htmlFor="clave2">Nombre de la Receta</label>
              <input type="text" className="form-control" id="clave2" value={clave2} onChange={handleNuevaClave2} required />
            </div>
            <div className="form-group">
              <label htmlFor="clave3">¿Desea publicar esta receta?</label>
              <select className="form-control" id="clave3" value={clave3} onChange={handleNuevaClave3} required>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="clave4">Ingredientes e Instrucciones a seguir para la Receta</label>
              <textarea className="form-control" id="clave4" value={clave4} onChange={handleNuevaClave4} required></textarea>
            </div>
            {editandoReceta ? (
              <>
                <button type="button" className="btn btn-warning" onClick={handleGuardarEdicion}>Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleAgregarReceta}>Añadir Receta</button>
            )}
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="border border-primary p-5 rounded">
          <h2 className="text-center mb-5 mt-3">Lista de Recetas</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Número de la receta</th>
                <th>Nombre de la receta</th>
                <th>¿Desea Publicar esta Receta?</th>
                <th>Ingredientes e Instrucciones a seguir para la Receta</th>
                <th>Acciones que se Pueden Hacer</th>
              </tr>
            </thead>
            <tbody>
              {recetas.map((receta) => (
                <tr key={receta.clave1}>
                  <td>{receta.clave1}</td>
                  <td>{receta.clave2}</td>
                  <td>{receta.clave3 ? 'Sí' : 'No'}</td>
                  <td>{receta.clave4}</td>
                  <td>
                    <button type="button" className="btn btn-warning btn-sm mr-2 mb-5" onClick={() => handleEditarReceta(receta)}>Editar</button>
                    <button type="button" className="btn btn-danger btn-sm mt-2 mb-5" onClick={() => handleEliminarReceta(receta.clave1)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;