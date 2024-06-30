const isPerfilAdmin = () => {
    return localStorage.getItem('perfil') === 'ADMIN';
}

export default isPerfilAdmin;