import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import ConfirmDeleteModal from "../../component/modal/confirmDeleteModal";
import formatDateToTable from "../../utils/formatDateToTable";
import isPerfilAdmin from "../../utils/isPerfilAdmin";
import statusPackage from "../../utils/statusPackage";

const PackageList = () => {

    const url = `https://back-end-fastfeet.onrender.com/api/v1/packages`;

    const token = localStorage.getItem('authToken');

    const [packages, setPackages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const navigate = useNavigate();

    const columns = [

        {
          Header: 'Entregador',
          accessor: 'Users.name',
          enableColumFilter: true
        },
        {
          Header: 'Endereço de Entrega',
          accessor: 'deliveryAddress',
          enableColumFilter: true
        },
        {
          Header: 'Data do Pedido',
          accessor: 'deliveryDate',
          enableColumFilter: true
        },
        {
          Header: 'Data de Previsão de Entrega',
          accessor: 'previusRequestDate',
          enableColumFilter: true
        },
        {
          Header: 'Data da Entrega',
          accessor: 'requestDate',
          enableColumFilter: true
        },
        {
          Header: 'Status da Encomenda',
          accessor: 'status',
          enableColumFilter: true
        },
      ];

    useEffect(() => {
        fetch(url + "/find-all", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(packageItem => {
                    packageItem.deliveryDate = formatDateToTable(packageItem.deliveryDate);
                    packageItem.previusRequestDate = formatDateToTable(packageItem.previusRequestDate);
                    packageItem.requestDate = formatDateToTable(packageItem.requestDate);
                    packageItem.status = statusPackage.find(x => x.value === packageItem.status).name
                })
                setPackages(data);
            })
            .catch(error => toast.error('Erro ao buscar Encomenda:', error));
    }, []);

    const removeEntity = (id) => {
        fetch(url + `/remove/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                toast.success('Encomenda removida com sucesso!');
            })
            .catch(error => toast.error('Erro ao remover Encomenda:', error));
    }

    const handleEdit = (row) => {
        navigate(`/edit-package/${row?.id}`);
    };

    const handleDelete = (row) => {
        setRowToDelete(row);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        removeEntity(rowToDelete.id)
        setPackages(packages.filter(item => item.id !== rowToDelete.id));
        setIsModalOpen(false);
        setRowToDelete(null);
    };

    return (
        <>
            <Header/>
            <Main title="Lista de Encomendas" url={isPerfilAdmin() && "/package-registration"}>
                <ReactTable
                    columns={columns}
                    data={packages}
                    title="Encomendas"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <ConfirmDeleteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            </Main>
            <Footer/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default PackageList;
