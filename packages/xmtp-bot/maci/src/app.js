import express from 'express';
import generateKeypairRoutes from './routes/genKeypair';

const app = express();
const PORT = process.env.PORT || 3000;

// 使用路由
app.use('/', generateKeypairRoutes);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});