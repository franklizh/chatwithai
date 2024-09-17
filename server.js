//node后端
//node server.js
//postman 测试http://localhost:3000/api/chat，修改body的content
const cors = require('cors');
const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET 路由
app.get('/api/chat', (req, res) => {
    res.status(200).json({ message: "Welcome to the chat API! Use POST to /api/chat" });
});

// POST 路由
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.content; // 假设用户输入在 req.body.content 中
    if (!userMessage) {
        return res.status(400).json({ message: "Missing user message." });
    }
    var data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": userMessage
            }
        ]
    });

    const options = {
        url: "",//openai或代理地址
        method: 'POST',
        headers: {
            'Authorization': "",//use your api key
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: data // 使用 body 而不是 data
    };

    request(options, (error, response, body) => {
        if (!error && response && response.statusCode === 200) {
            res.json(JSON.parse(body || '{}')); // 处理空响应的情况
        } else {
            const errorMessage = body ? JSON.parse(body) : { message: 'Internal Server Error' };
            res.status(response ? response.statusCode : 500).json(errorMessage);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
