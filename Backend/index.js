const express = require('express');
const bodyParser = require('body-parser');
const { use } = require('react');
const app = express();
const port = 8000
app.use(bodyParser.json());
let users = []
let couter = 1;
// path = GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

// path= POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    users.push(user);
    couter += 1;
    res.json({
        message: 'User added successfully',
        user: user  }); 
})        




// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    //user จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);

    //อัพเดทข้อมูล user
    users[selectedIndex].name = updateUser.name || users[selectedIndex].name;
    users[selectedIndex].email = updateUser.email || users[selectedIndex].email;





    //เอาข้อมูลที่อัพเดทแล้วส่งกลับไป
    res.json({
        message: 'User updated successfully',
        data: {
            user: updatedUser,
            indexUpdated: selectedIndex
        }
    });
})
    
// path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    //user จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);

    delete users[selectedIndex];

    res.json({
        message: 'User deleted successfully',
              indexDeleted: selectedIndex
    });
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

