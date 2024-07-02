import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Main from "../../component/main/Main";
import Card from "../../component/card/Card";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faMapLocationDot, faUser} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const [data, setData] = useState([
        {resource: "entregador", quantity: 0, icon: faUser},
        {resource: "destinatario", quantity: 0, icon: faMapLocationDot},
        {resource: "encomenda", quantity: 0, icon: faBox}
    ]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const findCounts = async () => {
            try {
                const [usersResponse, recipientResponse, packagesResponse] = await Promise.all([
                    fetch(`https://back-end-fastfeet.onrender.com/api/v1/users/count`, {headers}),
                    fetch(`https://back-end-fastfeet.onrender.com/api/v1/recipient/count`, {headers}),
                    fetch(`https://back-end-fastfeet.onrender.com/api/v1/packages/count`, {headers})
                ])

                const users = await usersResponse.json()
                const recipient = await recipientResponse.json()
                const packages = await packagesResponse.json()

                users.icon = faUser
                recipient.icon = faMapLocationDot
                packages.icon = faBox

                setData([users, recipient, packages])

            } catch (e) {
                toast.error('Erro ao buscar dados!');
            }
        }

        findCounts()
    }, []);
console.log(data)
    return (
        <>
            <Header/>
            <Main>
                <div style={{display: 'flex', justifyContent: 'center', gap: '1.5rem'}}>
                    {data.map((row, index) => {
                        return <Card key={index} title={row.resource} quantity={row.quantity} icon={<FontAwesomeIcon icon={row.icon} />}/>
                    })}
                </div>
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

export default Home;