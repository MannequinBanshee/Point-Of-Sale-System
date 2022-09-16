async function GetAllUsers() {
    const result = await $.ajax({
        url: '/user/all',
        type: 'GET'
    });
    var html = result;
    document.getElementById('UserManagementTable').innerHTML = html;
}



