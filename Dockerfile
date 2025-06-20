# 使用官方 nginx 镜像
FROM nginx:latest

# 删除默认静态资源
RUN rm -rf /usr/share/nginx/html/*

# 复制前端构建产物到 nginx 目录
COPY dist /usr/share/nginx/html

# 复制自定义 nginx 配置（如果有）
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
