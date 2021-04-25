#!/usr/bin/env bash

clear

ENV=.env
CLIENT_ENV=./client/.env
API_ENV=./api/.env


if [[ -f $ENV ]] && [ -f $CLIENT_ENV ] && [[ -f $API_ENV ]]
then
    RED='\033[0;31m'
    NC='\033[0m'
    printf "$RED The environment variables are already defined. $NC \n"
else
    read -p $'Enter the name of the database (default \'my_db\'): ' db_name
    read -p $'Enter username of the database (default \'root\'): ' db_user
    read -p $'Enter password of the database (default \'root\'): ' -s db_password
    read -p $'\nEnter hostname of the database (default \'localhost\'): ' db_host

    touch $ENV $CLIENT_ENV $API_ENV

    echo 'REACT_APP_SERVER_URL=http://localhost/api' >> $CLIENT_ENV

    echo $'PORT=8080

    NODE_ENV=developement

    # debug logger
    DEBUG=api*\n' >> $API_ENV

    DATABASE="# Database
    DB_NAME=${db_name:-my_db}
    DB_USER=${db_user:-root}
    DB_PASSWORD=${db_password:-root}
    DB_HOST=${db_host:-localhost}"

    echo "$DATABASE" >> $ENV
    echo "$DATABASE" >> $API_ENV

    docker-compose -f docker-compose.dev.yml up -d

    docker-compose -f docker-compose.dev.yml exec api node ./generateKeyPair.js
fi