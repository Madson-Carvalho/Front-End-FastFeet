import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";
import {useEffect, useState} from "react";

const ListUser = () => {
    const url = `http://localhost:3333/api/v1/users/find-all`;
    const [users, setUsers] = useState([]);

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
        fetch(url)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erro ao buscar Usuários:', error));
    }, []);

    return (
        <>
            <Header/>
            <Main title="Lista de Usuários" url="/create-user">
                <ReactTable title="Usuários" data={users} columns={columns}/>
            </Main>
            <Footer/>
        </>
    )
}

export default ListUser;