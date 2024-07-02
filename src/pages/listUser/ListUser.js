import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../component/modal/confirmDeleteModal";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import isPerfilAdmin from "../../utils/isPerfilAdmin";
import accessPerfil from "../../utils/accessPerfil";

const ListUser = () => {
    
    const url = `https://back-end-fastfeet.onrender.com/api/v1/users`;

    const token = localStorage.getItem('authToken');

    const [users, setUsers] = useState([]);
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
            Header: 'Perfil',
            accessor: 'perfil',
            enableColumFilter: true
        },
        {
            Header: 'Endereço',
            accessor: 'address',
            enableColumFilter: true
        },
        {
            Header: 'E-mail',
            accessor: 'email',
        },
        {
            Header: 'Telefone',
            accessor: 'phone',
        }
    ];

    useEffect(() => {
        fetch(url + "/find-all", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    user.perfil = accessPerfil.find(x => x.value === user.perfil).name
                })

                setUsers(data)
            })
            .catch(error => toast.error('Erro ao buscar Usuários:', error));
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
                toast.success('Usuário removido com sucesso!');
            })
            .catch(error => toast.error('Erro ao remover Usuário:', error));
    }

    const handleEdit = (row) => {
        navigate(`/edit-user/${row?.id}`);
    };

    const handleDelete = (row) => {
        setRowToDelete(row);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        removeEntity(rowToDelete.id)
        setIsModalOpen(false);
        setRowToDelete(null);
    };

    return (
        <>
            <Header />
            <Main title="Lista de Usuários" url={isPerfilAdmin() && "/create-user"} >
                <ReactTable
                    columns={columns}
                    data={users}
                    title="Usuários"
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
    );
};

export default ListUser;
