import express from 'express';
import genKeypair from './routes/genKeypair';
import signup from './routes/signup';

const app = express();
const PORT = process.env.PORT || 3000;

// 使用路由
app.use('/', genKeypair);
app.use('/', signup);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});