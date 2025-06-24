# 使用官方 nginx 镜像
FROM nginx:latest

# 删除默认静态资源
RUN rm -rf /usr/share/nginx/html/*

# 复制前端构建产物到 nginx 目录
COPY dist /usr/share/nginx/html

# 替换 Nginx 主配置文件
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
