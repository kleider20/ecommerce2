# Etapa única (más simple y confiable para Render)
FROM ubuntu:22.04

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias del sistema y agregar repositorio de PHP
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Agregar repositorio de PHP 8.2 (Sury)
RUN curl -fsSL https://packages.sury.org/php/apt.gpg | gpg --dearmor -o /usr/share/keyrings/suryphp.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/suryphp.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list

# Instalar PHP 8.2 + Nginx + Node.js
RUN apt-get update && apt-get install -y \
    php8.2-fpm \
    php8.2-pgsql \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-zip \
    php8.2-opcache \
    nginx \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Configurar Nginx
RUN echo "server { \
    listen 8080; \
    root /var/www/public; \
    index index.php; \
    location / { \
        try_files \$uri \$uri/ /index.php?\$query_string; \
    } \
    location ~ \.php$ { \
        fastcgi_pass unix:/run/php/php8.2-fpm.sock; \
        fastcgi_index index.php; \
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name; \
        include fastcgi_params; \
    } \
}" > /etc/nginx/sites-available/default

# Configurar PHP-FPM
RUN sed -i 's/;listen.owner = www-data/listen.owner = www-data/' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;listen.group = www-data/listen.group = www-data/' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;listen.mode = 0660/listen.mode = 0660/' /etc/php/8.2/fpm/pool.d/www.conf

# Crear usuario no root
RUN useradd -m -u 1000 app
USER app
WORKDIR /var/www

# Copiar proyecto
COPY --chown=app:app . .

# Instalar dependencias y compilar assets
RUN composer install --no-dev --optimize-autoloader
RUN npm ci && npm run build

# Permisos
RUN chown -R app:app /var/www

# Exponer puerto
EXPOSE 8080

# Iniciar servicios
CMD service php8.2-fpm start && nginx -g "daemon off;"
