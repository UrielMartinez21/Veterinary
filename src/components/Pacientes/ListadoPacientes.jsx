import React from "react";
import Paciente from "./Paciente";

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {
//------------------| Valor que regresara |------------------
    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            {pacientes && pacientes.length ? (
                <React.Fragment>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>

                    {pacientes.map( paciente => (           // Mostrar de forma dinamica los registros
                        <Paciente                           // Componente
                            key={paciente.id}
                            paciente={paciente}             // Valores mandados al componente
                            setPaciente={setPaciente}       // Envia valor a hijo del hijo
                            eliminarPaciente={eliminarPaciente}
                        />
                    ))}
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                        <p className="text-xl mt-5 mb-10 text-center">
                            Comienza agregando pacientes  {''}
                            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
                        </p>
                    </React.Fragment>
            )}
            
            
            
        </div>
    )
}

export default ListadoPacientes