# Entity Filter
Template containing the structure of the initial project to connect to the database and sequelize

## Construction
### Pre-requisites
* [Git](https://git-scm.com) - version latest
* [Node](https://nodejs.org/es/) - version 12.16.1 LTS
* [NPM](https://www.npmjs.com/get-npm) - version latest
* [Docker](https://www.docker.com) - version 18 or older

### Installation
Next, in the projects to use exec the next command:
```sh
npm install

define environment variable STAGE with the environment -- load files in config/env
- DEV
- QA
- LOCAL
- SNB
- PRO

```

### Build
```sh
npm install
npm run start
```
(optional) Build:
```sh
npm run build-docker
```
*Note 1*:`${name-folder-domain}` *is the name of the domain folder*

*Note 2*:`${name-folder-service}` *is the name of the service folder*

Verification the docker image:
```sh
docker images
```
> The docker image is very important for develop or deploy the container

