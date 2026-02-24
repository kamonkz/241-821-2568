const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;
app.use(bodyParser.json());
let users = []
let counter = 1;

let conn = null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}

//path = GET /users สำหรับ get ข้อมูล users ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0])
})

//path = POST /users สำหรับเพิ่ม users ใหม่
app.post('/users', async (req, res) => {
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?', user);
    console.log('results:', results);
    res.json({
        message: 'User created successfully',
        data: results[0]
    });
})

//path = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id
    let updatedUser = req.body;
    // หา users จาก id
    let selectedIndex = users.findIndex(user => user.id == id)
    //update users นั้น
    if (updatedUser.name) {
        users[selectedIndex].name = updatedUser.name || users[selectedIndex].name
    }
    if (updatedUser.age) {
        users[selectedIndex].age = updatedUser.age || users[selectedIndex].age
    }

    //ส่ง response กลับไปว่า update users ที่เลือกสำเร็จแล้ว

    res.json({
        message: 'User updated successfully',
        data: {
            user: updatedUser,
            indexUpdated: selectedIndex
        }
    })
})

//path = DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    let id = req.params.id
    let selectedIndex = users.findIndex(user => user.id == id)
    if (selectedIndex !== -1) {
        users.splice(selectedIndex, 1)
        res.json({
            message: 'User deleted successfully',
            data: {
                indexDeleted: selectedIndex
            }
        })
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`);
});