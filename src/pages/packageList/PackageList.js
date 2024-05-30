import Header from "../../component/header/Header";
import Main from "../../component/main/Main";
import ReactTable from "../../component/reactTable/ReactTable";
import Footer from "../../component/footer/Footer";

const PackageList = () => {
    const columns = [
        {
          Header: 'Destinatário',
          accessor: 'destinatario',
        },
        {
          Header: 'Entregador',
          accessor: 'entregador',
        },
        {
          Header: 'Endereço de Entrega',
          accessor: 'endereco',
        },
        {
          Header: 'Data do Pedido',
          accessor: 'dataPedido',
        },
        {
          Header: 'Data Prevista Entrega',
          accessor: 'dataPrevistaEntrega',
        },
        {
          Header: 'Data para Realizar Entrega',
          accessor: 'dataRealizacaoEntrega',
        },
        {
          Header: 'Status da Encomenda',
          accessor: 'status',
        },
      ];

      const data = [
        {
          destinatario: 'John Doe',
          entregador: 'Jane Smith',
          endereco: '123 Main St, Springfield',
          dataPedido: '2023-05-10',
          dataPrevistaEntrega: '2023-05-15',
          dataRealizacaoEntrega: '2023-05-14',
          status: 'Entregue'
        },
        // mais objetos de dados
      ];

    return (
        <>
            <Header/>
            <Main title="Lista de Encomendas" url="/create-package">
                <ReactTable title="Encomendas" data={data} columns={columns}/>
            </Main>
            <Footer/>
        </>
    )
}

export default PackageList;
