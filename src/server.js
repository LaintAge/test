const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Endpoint для аутентификации пользователя
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Запрос к API Arkime для аутентификации пользователя
    const response = await axios.post('http://10.244.88.120:8005/api/sessions', {
      username,
      password
    });

    // Проверка успешной аутентификации
    if (response.status === 200 && response.data.success) {
      res.status(200).json({ message: 'Успешная аутентификация' });
    } else {
      res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
    }
  } catch (error) {
    console.error('Ошибка при аутентификации:', error);
    res.status(500).json({ message: 'Ошибка при аутентификации' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
