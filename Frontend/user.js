// 1. load user ทั้งหมดจาก api /users 
const BASE_URL = 'http://localhost:8000';
window.onload = async() => {
    await loadData();
}

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);

    const userDOM = document.getElementById('users');
    let htmlData = '<div>'
    // 2.นำข้อมูลuser ที่ได้มาแสดงในหน้า web
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div>
    ${user.id}${user.firstname} ${user.lastname} 
    <button >Edit</button>
    <button class = 'delete' data-id = ${user.id}>Delete</button>

    </div>`
    }
    htmlData += '</div>'
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDOMs.length; i++) {  
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try{ 
                //1.
                await axios.delete(`${BASE_URL}/users/${id}`);
                await loadData()// recursive function
            } catch (error) {
                console.error(error);
            }
        })
    }
}