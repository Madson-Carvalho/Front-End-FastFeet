import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";

const ListUser = () => {
    const users = [
        {
            nome: 'João Silva',
            cpf: '123.456.789-00',
            senha: 'password123',
            perfil: 'admin',
            endereco: 'Rua A, 123, Bairro B, Cidade C',
            email: 'joao.silva@example.com',
            telefone: '(11) 98765-4321'
        },
        {
            nome: 'Maria Oliveira',
            cpf: '987.654.321-00',
            senha: 'senha456',
            perfil: 'entregador',
            endereco: 'Avenida X, 456, Bairro Y, Cidade Z',
            email: 'maria.oliveira@example.com',
            telefone: '(22) 97654-3210'
        }
    ];

    const columns = [
        {
            Header: 'Nome',
            accessor: 'nome',
            enableColumFilter: true
        },
        {
            Header: 'CPF',
            accessor: 'cpf',
            enableColumFilter: true
        },
        {
            Header: 'Senha',
            accessor: 'senha',
            enableColumFilter: true
        },
        {
            Header: 'Perfil',
            accessor: 'perfil',
            enableColumFilter: true
        },
        {
            Header: 'Endereço',
            accessor: 'endereco',
            enableColumFilter: true
        },
        {
            Header: 'E-mail',
            accessor: 'email',
            enableColumFilter: true
        },
        {
            Header: 'Telefone',
            accessor: 'telefone',
            enableColumFilter: true
        }
    ];

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