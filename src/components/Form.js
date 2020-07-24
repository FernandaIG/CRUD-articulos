import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const Form = () => {
    //data
    const marca = [
        {
            id_marca: '1',
            marca: 'Old Navy'
        },
        {
            id_marca: '2',
            marca: 'Gap'
        },
        {
            id_marca: '3',
            marca: 'HyM'
        }
    ]
    const articulo = [
        {
            id_art: '1',
            SKU: '11223',
            descripcion: 'playera color azul',
            precio: '250',
            marca: '1'
        },
        {
            id_art: '2',
            SKU: '22343',
            descripcion: 'pantalon negro',
            precio: '460',
            marca: '2'
        },
        {
            id_art: '3',
            SKU: '33567',
            descripcion: 'vestido azul',
            precio: '600',
            marca: '3'
        }
    ]
    //Hooks
    const [data, setData] = useState(articulo);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [selecc, setSelecc] = useState({
        id_art: '',
        SKU: '',
        descripcion: '',
        precio: '',
        marca: ''

    });

    const seleccionado = (art, caso) => {

        setSelecc(art);

        if (caso === 'Editar') {
            setModalEditar(true)
        } else {
            setModalEliminar(true)
        }
    }

    const handleChange = name => event => {
        const value = event.target.value;
        console.log('valor ', value);

        setSelecc({ ...selecc, [name]: value });

        console.log(selecc);
    }

    const editar = () => {
        let newData = data;

        newData.map((el, i) => {

            if (el.id_art === selecc.id_art) {

                el.SKU = selecc.SKU;
                el.descripcion = selecc.descripcion;
                el.precio = selecc.precio;
                el.marca = selecc.marca;
            }
        });

        setData(newData);

        setModalEditar(false)
    }

    const eliminar = () => {
        setData(data.filter(el => el.id_art !== selecc.id_art))

        setModalEliminar(false);
    }

    const insertar = () => {
        let valorInsertar = selecc;
        valorInsertar.id_art = data.length + 1;
        console.log(valorInsertar.id);
        let dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
    }

    const abrirModalInsertar = () => {
        setSelecc('');
        console.log('modal insertar', selecc);
        setModalInsertar(true);
    }

    const tabla = () => (
        <div>
            <div>
                <button
                    className="btn btn-success"
                    onClick={() => abrirModalInsertar()}
                >
                    Agregar artīculo
            </button>
            </div>
            <br />
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SKU</th>
                            <th>Descripción</th>
                            <th>precio</th>
                            <th>Marca</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((el, i) => (
                            <tr key={i}>
                                <td>{el.id_art}</td>
                                <td>{el.SKU}</td>
                                <td>{el.descripcion}</td>
                                <td>{el.precio}</td>
                                <td>{el.marca === '1' ? 'Old navy' : el.marca === '2' ? 'GAP' : 'HyM'}</td>
                                <td>
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() =>
                                            seleccionado(el, 'Editar')
                                        }
                                    >
                                        Editar
                            </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            seleccionado(el, 'Eliminar')
                                        }
                                    >
                                        Eliminar
                            </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

    const showModalEditar = () => (
        <Modal isOpen={modalEditar}>
            <ModalHeader>
                <div>
                    <h3>Editar Artículos</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>ID</label>
                    <input
                        className="form-control"
                        type="text"
                        name="id"
                        value={selecc.id_art}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>SKU</label>
                    <input
                        className="form-control"
                        type="text"
                        name="SKU"
                        value={selecc.SKU}
                        onChange={handleChange('SKU')}
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <input
                        className="form-control"
                        type="text"
                        name="descripcion"
                        value={selecc.descripcion}
                        onChange={handleChange('descripcion')}
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input
                        className="form-control"
                        type="text"
                        name="precio"
                        value={selecc.precio}
                        onChange={handleChange('precio')}
                    />
                </div>

                {/* <div className="form-group">
                    <label>Marca</label>
                    <input
                        className="form-control"
                        type="text"
                        name="precio"
                        value={selecc.marca}
                        onChange={handleChange('marca')}
                    />
                </div> */}

                <div>
                    <label>Marca</label>
                    <select
                        onChange={handleChange('marca')}
                        className="form-control"
                    >
                        <option>Sleccionar Marca</option>
                        {marca.map((m, i) => (
                            <option key={i} value={m.id_marca}>
                                {m.marca}
                            </option>
                        ))}
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary"
                    onClick={() => editar()}
                >
                    Actualizar
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => setModalEditar(false)}
                >
                    Cancelar
                </button>
            </ModalFooter>
        </Modal>
    )

    const showModalEliminar = () => (
        <Modal isOpen={modalEliminar}>
            <ModalBody>Deseas eliminar este artículo?</ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-danger"
                    onClick={() => eliminar()}
                >
                    si
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => setModalEliminar(false)}
                >
                    No
                </button>
            </ModalFooter>
        </Modal>
    )

    const showModalInsertar = () => (
        <Modal isOpen={modalInsertar}>
            <ModalHeader>
                <div>
                    <h3>Insertar artīculo</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>ID</label>
                    <input
                        className="form-control"
                        type="text"
                        name="id"
                        value={data.length + 1}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>SKU</label>
                    <input
                        className="form-control"
                        type="text"
                        name="SKU"
                        value={selecc ? selecc.SKU : ''}
                        onChange={handleChange('SKU')}
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <input
                        className="form-control"
                        type="text"
                        name="descripcion"
                        value={selecc ? selecc.descripcion : ''}
                        onChange={handleChange('descripcion')}
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input
                        className="form-control"
                        type="text"
                        name="precio"
                        value={selecc ? selecc.precio : ''}
                        onChange={handleChange('precio')}
                    />
                </div>

                <div>
                    <label>Marca</label>
                    <select
                        onChange={handleChange('marca')}
                        className="form-control"
                    >
                        <option>Sleccionar Marca</option>
                        {marca.map((m, i) => (
                            <option key={i} value={m.id_marca}>
                                {m.marca}
                            </option>
                        ))}
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary"
                    onClick={() => insertar()}
                >
                    Insertar
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => setModalInsertar(false)}
                >
                    Cancelar
                </button>
            </ModalFooter>
        </Modal>
    )

    const modal = () => (
        <div>
            {showModalEditar()}
            {showModalEliminar()}
            {showModalInsertar()}
        </div>
    )


    return (
        <div>
            <h3>Artīculos</h3>
            {tabla()}
            {modal()}
        </div>
    );

}

export default Form;