const btnBack = document.getElementById('back');
console.log(btnBack)


btnBack.addEventListener('click', () => {
    const currentPath = document.location.pathname;
    console.log('currentPath = ' + currentPath);   
    if(currentPath.indexOf('admin') != -1)
        document.location.href = '/api/admin';
    else document.location.href = '/api/user';
})

