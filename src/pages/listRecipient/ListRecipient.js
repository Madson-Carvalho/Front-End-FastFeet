import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";
import {useEffect, useState} from "react";

const ListRecipient = () => {
    const url =`http://localhost:3333/api/v1/recipient/find-all`;
    const [recipient, setRecipient] = useState([]);

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
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1MmJmMzExLTZiZDctNDBkMS1iYTlhLWQ0M2Q4YTA5YTg2NSIsImlhdCI6MTcxOTA5MjczMCwiZXhwIjoxNzE5MDk2MzMwfQ.LGLMoL6xbZL2J5elV1nX8CRsjeFIb5dH-RWxoLfVDdE',
            }
        })
            .then(response => response.json())
            .then(data => setRecipient(data))
            .catch(error => console.error('Erro ao buscar Destinatários:', error));
    }, []);


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