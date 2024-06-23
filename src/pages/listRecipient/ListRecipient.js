import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";
import {useEffect, useState} from "react";
import ConfirmDeleteModal from "../../utils/modal/confirmDeleteModal";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const ListRecipient = () => {

    const url = `http://localhost:3333/api/v1/recipient`;

    const token = localStorage.getItem('authToken');

    const [recipient, setRecipient] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const navigate = useNavigate();

    const columns = [
        {
            Header: 'Nome',
            accessor: 'name',
            enableColumFilter: true
        },
        {
            Header: 'CPF',
            accessor: 'cpf',
            enableColumFilter: true
        },
        {
            Header: 'Telefone',
            accessor: 'phone',
            enableColumFilter: true
        },
        {
            Header: 'E-mail',
            accessor: 'email',
            enableColumFilter: true
        },
        {
            Header: 'Endereço',
            accessor: 'address',
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
            .then(data => setRecipient(data))
            .catch(error => toast.error('Erro ao buscar Destinatário:', error));
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
                toast.success('Destinatário removido com sucesso!');
            })
            .catch(error => toast.error('Erro ao remover Destinatário:', error));
    }

    const handleEdit = (row) => {
        navigate(`/edit-recipient/${row?.id}`);
    };

    const handleDelete = (row) => {
        setRowToDelete(row);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        removeEntity(rowToDelete.id)
        setRecipient(recipient.filter(item => item.id !== rowToDelete.id));
        setIsModalOpen(false);
        setRowToDelete(null);
    };

    return (
        <>
            <Header />
            <Main title="Lista de Destinatários" url="/register-recipient">
                <ReactTable
                    columns={columns}
                    data={recipient}
                    title="Destinatários"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <ConfirmDeleteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            </Main>
            <Footer />
        </>
    );
};

export default ListRecipient;