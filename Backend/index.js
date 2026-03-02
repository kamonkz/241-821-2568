const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let users = []
let counter = 1;
let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}
// path = GET users สำหรับ get ข้อมูล users ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running at http://localhost:${port}`);
});
// path = GET users/:id สำหรับ get ข้อมูล user ตาม id
app.get('/users/:id', async (req, res) => {
    try { 
        const userId = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (results[0].length === 0) {
            throw { statusCode: 404, message: 'User not found' }; 
        }

        res.json(results[0][0]);
    } catch (error) { 
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500; 
        
        res.status(statusCode).json({
            message: error.message || 'Error fetching user',
            error: error.message 
        });
    }
});
// path = POST users สำหรับสร้าง user ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body; 
        const [results] = await conn.query('INSERT INTO users SET ?', user); 
        
        res.json({
            message: 'User created successfully',
            data: results 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
}); 




// PUT /users/:id สำหรับแก้ไขข้อมูล user ตาม id 
app.put('/users/:id', async (req, res) => {
    try {
        let updatedUser = req.body;
        const results =await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, req.params.id]);
        if (results[0].affectedRows === 0) {
            throw { statusCode: 404, message: 'User not found'};
        }
        res.json({
            message: 'User updated successfully',
            data: results[0]
        });
    } catch (error) {
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: error.message || 'Error updating user',
            error: error.message
        });
    }
    
});