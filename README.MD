# http servert template
## 总述
typescript编写
服务使用的express
ORM使用Prisma
Log 使用winston
包含简单的登录和验证功能
多环境配置

## 项目结构:
controller存放对外服务的接口
db文件夹存放prisma连接
middlewares文件夹存放过滤器和interceptor
routers文件夹存放路由
service文件夹存放业务逻辑
main.ts 项目启动函数

## 流程
### 注册:
email+password
存储时password 使用bycrpto做hash, 使用10位的salt
返回email和生成的userId

### 登录:
校验email和password
校验成功使用jwt.sign对userId和email做签名
将结果放入返回包的header里Authorization字段:res.setHeader('Authorization', 'Bearer ' + token);

### 校验:
在middlewares中authToken.ts做校验
校验使用jwt.verify()解出{userId, email}, 将这个authInfo放入body中继续往下游传递
其他方法校验这个authInfo中的id是否可以修改或者查看当前资源