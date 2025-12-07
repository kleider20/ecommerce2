# Etapa de construcción
FROM ubuntu:22.04 AS builder

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    lsb-release \
    git \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar PHP 8.2
RUN curl -fsSL https://packages.sury.org/php/apt.gpg | gpg --dearmor -o /usr/share/keyrings/suryphp.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/suryphp.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list
RUN apt-get update && apt-get install -y \
    php8.2 \
    php8.2-cli \
    php8.2-fpm \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-pgsql \
    php8.2-curl \
    php8.2-zip \
    php8.2-opcache

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar Node.js 18 (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Crear usuario no root
RUN useradd -m -u 1000 app
USER app
WORKDIR /var/www

# Copiar archivos (evitar .env)
COPY --chown=app:app . .

# Instalar dependencias de PHP y compilar assets
RUN composer install --no-dev --optimize-autoloader
RUN npm ci && npm run build

# Etapa de ejecución
FROM ubuntu:22.04

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

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

# Configurar Nginx
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

# Configurar PHP-FPM
RUN sed -i 's/;listen.owner = www-data/listen.owner = www-data/' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;listen.group = www-data/listen.group = www-data/' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;listen.mode = 0660/listen.mode = 0660/' /etc/php/8.2/fpm/pool.d/www.conf

# Permisos
RUN chown -R www-data:www-data /var/www

# Usuario no root
USER www-data

# Exponer puerto
EXPOSE 8080

# Iniciar servicios
CMD service php8.2-fpm start && nginx -g "daemon off;"
