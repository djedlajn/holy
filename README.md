# Instructions

### Enviroment

```bash
docker: Docker version 19.03.5-ce, build 633a0ea838

docker-compose: docker-compose version 1.25.0, build 0a186604

yarn: 1.21.0

Linux 5.4.2-1-ARCH #1 SMP PREEMPT Thu Dec 5 09:55:57 UTC 2019 x86_64 unknown GNU/Linux
```

### Pre-requesites

Note due to usage of [argon2](https://www.npmjs.com/package/argon2) additional steps may be required.

```
docker-compose up -d
```

```bash
yarn install
```

Run in development mode (reads enviroment from env/.env.development )

```bash
yarn start:dev
```

Run in production mode (reads enviroment from env/.env.production )

```bash
yarn start:prod
```

Swagger runs on port `4200` by default and is available via [link](http://localhost:4200/api)

API's Collection for [Insomnia](https://insomnia.rest/) is located in repo named `insomnia.json`

Custom SQL querry for inserting three users is under `sql` directory and can be executed via `pg cli`
