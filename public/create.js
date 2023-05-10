const btnBack = document.getElementById('back');

btnBack.addEventListener('click', () => {
    const currentPath = document.location.pathname;
    console.log(currentPath);
    if(currentPath.indexOf('admin') != -1)
        document.location.href = '/api/admin';
    else document.location.href = '/api/user';
})