# Etapa de ejecución
FROM ubuntu:22.04

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Agregar repositorio de PHP (Sury) EN LA ETAPA DE EJECUCIÓN
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://packages.sury.org/php/apt.gpg | gpg --dearmor -o /usr/share/keyrings/suryphp.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/suryphp.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list

# Instalar solo lo necesario para ejecutar
RUN apt-get update && apt-get install -y \
    php8.2-fpm \
    php8.2-pgsql \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-zip \
    php8.2-opcache \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Copiar desde la etapa de construcción
COPY --from=builder /var/www /var/www
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

# Configurar Nginx y PHP-FPM (igual que antes)
RUN echo "server { \
    listen 8080; \
    root /var/www/public; \
    index index.php; \
    location / { \
        try_files \$uri \$uri/ /index.php?\$query_string; \
    } \
    location ~ \.php$ { \
        fastcgi_pass 127.0.0.1:9000; \
        fastcgi_index index.php; \
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name; \
        include fastcgi_params; \
    } \
}" > /etc/nginx/sites-available/default

RUN sed -i 's/;listen.owner = www-data/listen.owner = www-data/' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;listen.group = www-data/listen.group = www-data/' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;listen.mode = 0660/listen.mode = 0660/' /etc/php/8.2/fpm/pool.d/www.conf

RUN chown -R www-data:www-data /var/www
USER www-data
EXPOSE 8080
CMD service php8.2-fpm start && nginx -g "daemon off;"
