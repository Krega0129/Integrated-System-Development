# Integrated-System-Development

## server

服务端

```
cd server
```

### 安装依赖

```
npm install
```

### 添加项目环境变量

在 `server` 根目录新建 `.env` 文件，配置 `server`、数据库端口等属性，变量名详情 `server/app/config.js`

### 生成 JWT 密钥

在 `server/app/keys` 打开 `git bash` 

```
openssl
genrsa -out private.key 1024
rsa -in private.key -pubout -out public.key
```

### 启动 server

```
npm start
```

## web

网页端

```
cd web
```

## 安装依赖
```
npm install
```

### 启动
```
npm run serve
```
