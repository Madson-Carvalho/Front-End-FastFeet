import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";

const ListRecipient = () => {
    const recipient = [
        {
            nome: "Ana Souza",
            cpf: "123.456.789-00",
            endereco: "Rua das Flores, 123, São Paulo, SP, 01000-000",
            email: "ana.souza@example.com",
            telefone: "(11) 91234-5678"
        },
        {
            nome: "Carlos Mendes",
            cpf: "987.654.321-00",
            endereco: "Av. Paulista, 456, São Paulo, SP, 01310-100",
            email: "carlos.mendes@example.com",
            telefone: "(11) 99876-5432"
        },
        {
            nome: "Mariana Oliveira",
            cpf: "456.789.123-00",
            endereco: "Rua das Palmeiras, 789, Rio de Janeiro, RJ, 20000-000",
            email: "mariana.oliveira@example.com",
            telefone: "(21) 91234-5678"
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
            Header: 'Telefone',
            accessor: 'telefone',
            enableColumFilter: true
        },
        {
            Header: 'E-mail',
            accessor: 'email',
            enableColumFilter: true
        },
        {
            Header: 'Endereço',
            accessor: 'endereco',
            enableColumFilter: true
        },
    ];

    return (
        <>
            <Header/>
            <Main title="Lista de Destinatários" url="/register-recipient">
                <ReactTable title="Destinatários" data={recipient} columns={columns}/>
            </Main>
            <Footer/>
        </>
    )
}

export default ListRecipient;