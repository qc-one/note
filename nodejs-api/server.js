const express = require('express');
const app = express();
const port = 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 模拟数据
const users = [
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
];

const products = [
  { id: 1, name: 'iPhone 15', price: 5999, category: '手机' },
  { id: 2, name: 'MacBook Pro', price: 12999, category: '电脑' },
  { id: 3, name: 'AirPods Pro', price: 1999, category: '耳机' }
];

// CORS 跨域支持
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ==================== 用户相关接口 ====================

// 获取所有用户
app.get('/api/users', (req, res) => {
  res.json({
    code: 200,
    message: 'success',
    data: users
  });
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      code: 404,
      message: '用户不存在',
      data: null
    });
  }
  res.json({
    code: 200,
    message: 'success',
    data: user
  });
});

// ==================== 商品相关接口 ====================

// 获取所有商品
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  let result = products;
  
  // 支持按分类筛选
  if (category) {
    result = products.filter(p => p.category === category);
  }
  
  res.json({
    code: 200,
    message: 'success',
    data: result
  });
});

// 获取单个商品
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({
      code: 404,
      message: '商品不存在',
      data: null
    });
  }
  res.json({
    code: 200,
    message: 'success',
    data: product
  });
});

// ==================== 通用接口 ====================

// 获取服务器状态
app.get('/api/health', (req, res) => {
  res.json({
    code: 200,
    message: '服务运行正常',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    data: null
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    data: null
  });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log('可用接口：');
  console.log('  GET  /api/health      - 健康检查');
  console.log('  GET  /api/users       - 获取所有用户');
  console.log('  GET  /api/users/:id   - 获取单个用户');
  console.log('  GET  /api/products    - 获取所有商品（支持 ?category=分类名 筛选）');
  console.log('  GET  /api/products/:id - 获取单个商品');
});
