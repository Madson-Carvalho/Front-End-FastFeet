import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import ReactTable from "../../ReactTable";

const Home = () => {

    const data = [
        { id: 1, name: 'Manoel Gomes', age: 30 },
        { id: 2, name: 'Bob Charlie Marley', age: 25 },
        { id: 3, name: 'Brega Funk producç~eos', age: 40 },
        { id: 4, name: 'Manoel Gomes', age: 30 },
        { id: 5, name: 'Bob Charlie Marley', age: 25 },
        { id: 6, name: 'Brega Funk producç~eos', age: 40 },
        { id: 7, name: 'Manoel Gomes', age: 30 },
        { id: 8, name: 'Bob Charlie Marley', age: 25 },
        { id: 9, name: 'Brega Funk producç~eos', age: 40 },
        { id: 10, name: 'Brega Funk producç~eos', age: 40 },
        { id: 11, name: 'Brega Funk producç~eos', age: 40 },
    ];

    const columns = [
        {
            Header: 'id',
            accessor: (row) => row.id,
            canFilter: false,
        },
        {
            Header: 'name',
            accessor: (row) => row.name,
            canFilter: false,
        },
        {
            Header: 'age',
            accessor: (row) => row.age,
            canFilter: false,
        },
    ];


    return (
        <>
            <Header/>
            <Main>
                <ReactTable columns={columns} data={data}/>
            </Main>
            <Footer/>
        </>
    )
}

export default Home;
