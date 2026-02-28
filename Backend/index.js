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
    res.json(results[0]);
});

//path = POST /users สำหรับเพิ่ม users ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log('results:', results);
        res.json({
            message: 'User created successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
})



//path = GET /user/:id สำหรับ get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id', async (req, res) => {
    try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    if (results[0].length == 0) {
        throw { statusCode: 404, message: 'User not found' };
    }
    res.json(results[0][0]);
} 
catch (error) {
    console.error('Error fetching user:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        message: 'Error fetching user',
        error: error.message
    });
}
})



//PUT /user/:id สำหรับ update ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.put('/users/:id', async (req, res) => {
    try {
    let id = req.params.id
    let updatedUser = req.body;
    const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser,id])
    if (results[0].affectedRows == 0) {
        throw { statusCode: 404, message: 'User not found' };
    }
    res.json({
        message: 'User updated successfully',
        data: updatedUser
    });
} 
catch (error) {
    console.error('Error fetching user:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        message: 'Error updating user',
        error: error.message
    });
}
})

//Delete /user/:id สำหรับลบ user ที่มี id ตรงกับที่ส่งมา
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', [id])
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User deleted successfully'
        });  
    } 
    catch (error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})

//path = PUT /user/:id
app.patch('/users/:id', async (req, res) => {
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