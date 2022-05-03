# Getting started

## Start the API

```bash
npm install
npm run start
```

## Try it out

Using Visual Studio Code + REST Client plugin (humao.rest-client):

* Open [test.http](resources/http/test.http)
* Run requests by pressing Ctrl + Alt + R



# Devel stuff

## Buidding OCI/docker image

```bash
docker build -t hackatchlon-data .
```

## Starting image locally
```bash
docker run --name hackathlon-data -p 3000:3000 --rm hackathlon-data:latest
```

## Stopping local image
```bash
docker stop hackathlon-data
```
