import React, { useState, useEffect } from "react";
import Error from "../Mensaje/Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
//------------------| Uso de efectos |------------------
    useEffect(() => {
        if (Object.keys(paciente).length > 0) {     // Convierte objeto a arreglo de strings
            setMascota(paciente.mascota)
            setPropietario(paciente.propietario)
            setCorreo(paciente.correo)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])

//------------------| ID con numeros aleatorios y fecha |------------------
    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return random+fecha
    }
//------------------| Uso de estados |------------------
    const [mascota, setMascota] = useState("");
    const [propietario, setPropietario] = useState("");
    const [correo, setCorreo] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");

    const [error, setError] = useState(false);

//------------------| Funcion de envio |------------------
    const handleSubmit = (e) => {
        e.preventDefault()                          // Evito que se actualice la pagina

        //---> Validacion de campos vacios
        if ([mascota, propietario, correo, fecha, sintomas].includes("")) {
            setError(true)
            return;
        }
        setError(false)

        //---> Crea un objeto de paciente
        const objetoPaciente = {
            mascota,
            propietario,
            correo,
            fecha,
            sintomas,
        }

        //---> Editar o agregar nuevo paciente
        if (paciente.id) {                              // El paciente existe                
            objetoPaciente.id = paciente.id             // ID de paciente creado
            const pacientesActualizados = pacientes.map(// Revisa cada paciente
                pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            )
            setPacientes(pacientesActualizados)         // Se actualiza la lista de pacientes
            setPaciente({})                             // Se limpia el objeto
        } else {                                        // El paciente es nuevo
            objetoPaciente.id=generarId()
            setPacientes([...pacientes,objetoPaciente]) // Mandamos la lista recibida + el nuevo registro
        }

        //---> Reinicia campos
        setMascota("")
        setPropietario("")
        setCorreo("")
        setFecha("")
        setSintomas("")
    }

//------------------| Valor que regresara |------------------
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
                {error && <Error/>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre de Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={mascota}
                        onChange={(e)=>setMascota(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre del propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e)=>setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Correo Electronico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={correo}
                        onChange={(e)=>setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e)=>setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describre los sintomas"
                        value={sintomas}
                        onChange={(e)=>setSintomas(e.target.value)}
                    />
                </div>
                <input
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    type="submit"
                    value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario