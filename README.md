# 项目文档

## 路由设计

| 请求方法 | 请求路径        | 查询字符串 | 请求体                                                            | 路径参数 | 作用       |
|------|-------------|-------|----------------------------------------------------------------|------|----------|
| get  | /advert     |       |                                                                |      | 渲染广告管理列表 |
| get  | /advert/add |       |                                                                |      | 渲染添加广告页面 |
| post | /advert/add |       | image、link、start_time、end_time、title、create_time、last_modified |      | 处理广告请求   |
|      |             |       |                                                                |      |          |