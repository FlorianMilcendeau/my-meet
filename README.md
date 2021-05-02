# My Meet

## Getting started

1. Clone the repos

```
git clone https://github.com/FlorianMilcendeau/MyMeet.git
```

2. Run script to init environment variables (**run the script only once**)

```
./init_env_dev.sh
```

3. Run docker (Only if the script **init_env_dev.sh** has already been executed.)

```
docker-compose -f docker-compose.dev.yml up -d
```

4. If you want to run the tests

```
docker-compose -f docker-compose.dev.yml exec cypress npx cypress run
```

## Env Sample

1. Env root folder

```
# Database
DB_NAME=<YOUR_DB_NAME>
DB_USER=<YOUR_USERNAME>
DB_PASSWORD=<YOUR_PASSWORDS>
DB_HOST=<YOUR_HOSTNAME>
```


2. Env api

```
PORT=<YOUR_PORT>

NODE_ENV=<ENVIRONNEMENT_TYPE>

# debug logger
DEBUG=api*

# Database
DB_NAME=<YOUR_DB_NAME>
DB_USER=<YOUR_USERNAME>
DB_PASSWORD=<YOUR_PASSWORDS>
```
