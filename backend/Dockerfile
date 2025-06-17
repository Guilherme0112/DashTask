FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    curl \
    git \
    && docker-php-ext-install pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

EXPOSE 8000

RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

CMD php artisan serve --host=0.0.0.0 --port=8000