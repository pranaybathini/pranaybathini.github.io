---
title: "Dockerizing a spring boot application"
description: "Dockerizing an application means making our application run in a docker container.."
date: "2021-04-29"
image: "/images/8_dockerize.jpeg"
tags: ["Docker", "Spring Boot"]

---


Dockerizing an application means making our application run in a docker container. Dockerize an application is also means as containerize  an application.



 Why? Because it allows a developer to package the application and its dependencies and libraries as a single package. It will be easier to create, deploy and run the application. In short, it dockerizing helps to package, distribute and manage the applications inside the containers.



There are many advantages docker brings to the table. 



* Portability - Once you have tested your dockerized application, you can deploy to any other system running the docker and it will run without any issues. No more - it runs only on my machine issues.
* Resource usage and performance - docker uses host system kernel and resources as required by the container unlike VM which has an operating system and which uses same amount of resources even when applications doesn’t need them. No more wastage of resources. 
* Isolation and scalability - Each docker container has its own lifecycle and can create new containers as per demand. They are faster to create and quicker to start. 
* Security - As docker containers are isolated, this will give us more control over traffic management and security
* Flexibility - configuration can be put into code and can be deployed to any environments without any problem. No need of setting up configs again and again. 


---

Let’s begin by writing the docker file. 

```docker
FROM ubuntu:16.04

# Install dependencies
RUN apt-get update && \
apt-get install -y git build-essential curl wget software-properties-common

# Install JDK 8
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/ && \
    rm -rf /var/cache/oracle-jdk8-installer;
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

ENV MAVEN_VERSION 3.6.3

RUN curl -fsSL http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar xzf - -C /usr/share \
  && mv /usr/share/apache-maven-$MAVEN_VERSION /usr/share/maven \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

RUN mkdir -p /app/quartz-scheduler

COPY ./target/quartz-scheduler-0.0.1-SNAPSHOT.jar  /app/quartz-scheduler/quartz-scheduler-0.0.1-SNAPSHOT.jar

COPY ./entrypoint.sh  /app/quartz-scheduler/entrypoint.sh

WORKDIR /app/quartz-scheduler

RUN chmod 755 /app/quartz-scheduler/entrypoint.sh

EXPOSE 8080

CMD ["/app/quartz-scheduler/entrypoint.sh"]
```

In this docker file, I am using ubuntu 16.04 as base image and installing JDK 8 and maven to build the jar and run the application with the help of entrypoint.sh file where we run the jar. 


---

## Script to automate steps

```
# Step 0: A. Stop existing container and remove it.  B. Remove the old image.
docker ps -q --filter "name=quartz-scheduler" | grep -q . && docker stop quartz-scheduler && docker rm -fv quartz-scheduler && docker rmi quartz-scheduler

# Step 1: Create a new jar
mvn clean install

# Step 2: Dockerize with Dockerfile
docker build -t quartz-scheduler .

# Step 3: Run the container
docker run --name quartz-scheduler --add-host=host.docker.internal:host-gateway --env SPRING_PROFILES_ACTIVE=local-postgres -p 9166:9166 -d quartz-scheduler
```

First, we will check if an existing container is present. If it is present, we will stop the container and remove it. Also, we will delete the existing image. 



In the next step, using maven, we will build the project and generate a new jar and create a new image. 



Next, we will run the image with profile local-postgres and expose port 9166 to host machine. 



Postgres container should be running, before executing the docker_start.sh file. 



Refer this [post](https://pranaybathini1.blogspot.com/2021/04/email-scheduler-application-with-quartz.html) to learn how to run the postgres container. 



You can follow the same process for mysql too by creating a mysql container. Refer [this post](https://pranaybathini1.blogspot.com/2021/04/email-scheduler-application-with-quartz.html) on how to create a mysql container. 



Here we are creating a container for database and binding it with the host port. And from the application container, we are interacting with the database container via same port on host. 



For docker v20.10 and above, add --add-host=host.docker.internal:host-gateway  to your docker command and in application, make sure to use - host.docker.internal in place of localhost to enable the container to access host machine ports. 

[Refer this  stack overflow for other versions of docker engine ](https://stackoverflow.com/questions/31324981/how-to-access-host-port-from-docker-container)





If wondering how to see the logs printed to console from application, use below command 

```bash
docker logs <containerId> -f

```

This will follow the output much like tail -f command. 

 
![](/images/8_1_sb.png)


## Improvements


We can add more steps to our [docket_start.sh](https://gist.github.com/pranaybathini/7657028a247a8b6b814bdf9e93882771) like pushing the image, tagging our image. I will go through some of the commands. 

## Pushing the image to docker registry


```markdown
### Pushing the image to Docker Registry

1. **Create a Docker Hub Account:**
   - Visit [Docker Hub](https://hub.docker.com/) and create an account.
   - Verify your email to activate the account.

2. **Login to Docker Hub:**
   ```bash
   docker login --username=your_docker_hub_username --email=youremail@company.com
   ```

3. **Tag Your Image:**
   ```bash
   docker tag <ImageId> yourusername/imagename:tag
   ```

4. **Push to Docker Hub:**
   ```bash
   docker push yourusername/imagename
   ```

   Now, everyone can pull the image using:
   ```bash
   docker pull yourusername/imagename:tag
   ```

### Resources for Learning Docker

- [Official Docker Documentation](https://docs.docker.com/)
- [Docker Beginner's Guide Series](https://medium.com/codingthesmartway-com-blog/docker-beginners-guide-part-1-images-containers-6f3507fffc98) on Medium
- [Docker Tutorial Series](https://rominirani.com/docker-tutorial-series-part-1-installation-7cced0a6935) on Medium
- [Docker Commands Overview](https://medium.com/edureka/docker-commands-29f7551498a8) on Medium
```

This Markdown format will help present your steps clearly, making it easier to follow and understand for others.