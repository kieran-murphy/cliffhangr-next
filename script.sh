# kill all current running docker containers
docker kill $(docker ps -q)

# pull the latest version of the code
git pull

# build the docker container with the latest code
docker build --no-cache -t cliffhangr-next .

# run the docker container on port 3000
docker run -p 3000:3000 cliffhangr-next
