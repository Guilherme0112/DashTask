FROM php:8.2

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    curl \
    git \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /var/www

# Copia arquivos de dependências primeiro
COPY composer.json composer.lock ./

# Instala dependências PHP
RUN composer install --no-dev --optimize-autoloader

# Copia o restante do projeto
COPY . .

# Permissões
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

# Expondo porta
EXPOSE 8000

# Comando para rodar
CMD php artisan serve --host=0.0.0.0 --port=8000
