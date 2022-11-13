import React, { useEffect, useState } from "react"
import Header from "./components/Header/Header"
import Formulario from "./components/Formulario/Formulario"
import ListadoPacientes from "./components/Pacientes/ListadoPacientes"

const App = () => {
//------------------| Uso de estados |------------------
  const [pacientes, setPacientes] = useState(           // Obtiene los datos de localStorage
    () => JSON.parse(
      localStorage.getItem('pacientes')
    ) || []
  );
  const [paciente, setPaciente] = useState({})          // Objeto vacio

//------------------| Funcion Eliminar |------------------
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(     // Iterara cada elemento del arreglo
      pacienteEliminar => pacienteEliminar.id !== id    // Traera todos menos el id seleccionado
    )
    setPacientes(pacientesActualizados)                 // Actualizara la lista de pacientes
  }

//------------------| Guardar en localStorage |------------------
  useEffect(() => {
    localStorage.setItem('pacientes',JSON.stringify(pacientes))
  }, [pacientes])

//------------------| Valor que regresara |------------------
  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-20 flex">
        <Formulario
          pacientes={pacientes}         // Mandamos la lista de pacientes
          setPacientes={setPacientes}   // Recibimos la lista + un nuevo registro
          paciente={paciente}           // Llenara los campos del paciente
          setPaciente={setPaciente}     // Limpiara los campos
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
