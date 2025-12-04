#!/bin/bash

DOMAIN="dreamvault-backend-environment.eba-my9vrvk3.us-west-2.elasticbeanstalk.com/"

# Only generate certificate if not exists
if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo "Generating Let's Encrypt SSL certificate for $DOMAIN"

    certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

    systemctl reload nginx
else
    echo "SSL certificate already exists, skipping generation"
fi
