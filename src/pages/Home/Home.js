import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable"

const Home = () => {
    const data = [
        {
            nome: 'Khalifa do brega',
            idade: 28,
            email: 'joao.silva@example.com',
            cargo: 'Desenvolvedor'
        },
        {
            nome: 'Maria Souza',
            idade: 34,
            email: 'maria.souza@example.com',
            cargo: 'Designer'
        },
        {
            nome: 'Pedro Santos',
            idade: 25,
            email: 'pedro.santos@example.com',
            cargo: 'Analista de Dados'
        },
        {
            nome: 'Ana Oliveira',
            idade: 30,
            email: 'ana.oliveira@example.com',
            cargo: 'Gerente de Projetos'
        }
    ];

    const columns = [
        {
            Header: 'Nome',
            accessor: 'nome', // chave correspondente no objeto de dados
            enableColumFilter: "asdsad"
        },
        {
            Header: 'Idade',
            accessor: 'idade', // chave correspondente no objeto de dados
            enableColumFilter: "asdsad"
        },
        {
            Header: 'E-mail',
            accessor: 'email',   // chave correspondente no objeto de dados
            enableColumFilter: "asdsad"
        },
        {
            Header: 'Cargo',
            accessor: 'cargo' // chave correspondente no objeto de dados
        }
    ];

    return (
        <>
            <Header/>
            <Main>
                <ReactTable columns={columns} data={data} title="Entregadores"/>
            </Main>
            <Footer/>
        </>
    )
}

export default Home;