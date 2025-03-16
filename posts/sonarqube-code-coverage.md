---
title: "Code coverage and quality analysis with sonarQube and Spring-Boot"
description: " sonarqube we can write quality code as it warns about potential bugs, hot-spots, vulnerabilities, code smells and duplication in the code..."
date: "2021-03-01"
image: "/images/6_sonarqube.png"
tags: [ "SonarQube", "SpringBoot"]
---


In this article, I am going to explain how to use SonarQube source code analysis tool with JaCoCo code coverage library for a Spring Boot application.

## Introduction

For those who started with TDD (Test Driven Development), code coverage is an important tool to measure and know how much percentage of their source code is covered and tested with test cases developed including both unit and integration tests.

## Why it is important?

Higher code coverage will increase the maintainability of the code. Also, with sonarqube we can write quality code as it warns about potential bugs, hot-spots, vulnerabilities, code smells and duplication in the code.

## Installation and Running

We are going to install sonarqube with docker and run it as a docker image.

To download the sonarqube image, type below command in your command line.

```bash
docker pull sonarqube
```
Once downloaded, enter the below command in the command line to verify it is downloaded.

```bash
docker images
```

We will start the container based on the downloaded image and give it the name sonarqube with the following command.

```bash
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```
Here, -d option is for detached mode (background) and we expose 9000 and 9092 ports to the host using same port numbers.

Now, we can see the sonarqube dashboard by navigating to http://localhost:9000.

By default, the username and password is admin. After you login for the first time, it will prompt you to change the password.


```
Default username : admin

Default password : admin
```


JaCoCo Maven configuration

JaCoCo is a one of the famous code coverage library available for java based applications. In order to add JaCoCo for the project, you have to add the following maven plugin to the pom.xml file of the project.

```xml
 <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.6</version>
                <executions>
                    <execution>
                        <id>default-prepare-agent</id>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>default-report</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
```

Please find my pom.xml file if you still can’t find the plugins section.

```

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.0</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.pranay.learn</groupId>
    <artifactId>backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>backend</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.16</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <version>2.3.4.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <!-- Below plugin needs to be added for code coverage-->
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.6</version>
                <executions>
                    <execution>
                        <id>default-prepare-agent</id>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>default-report</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>

```


## Test coverage Analysis

First we need to run test cases before sending the report to sonarqube server. We can run the tests with the following command.

```bash
mvn test
```

Once it executes successfully, we will send the report to sonar server which will let us analyze which parts of the code to be covered with many other detailed reports and stats.

To send the report to sonar server, run the following command

```bash
mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=<PASSWORD> 
```
If you have changed the password, replace <PASSWORD> placeholder with your password.

Once this command executes successfully, you should be able to see the URL for the analysis report. You can click the link to see the report.

Or you can also navigate to http://localhost:9000 to view the report.

After navigation, you should be able to see the sonarqube dashboard like below with your project with different reports.

## Excluding classes from code coverage

In the code coverage analysis we focus only about the classes that should be covered with unit and integration tests. We need to exclude the non required classes like configs from coverage analysis.

This can be done by adding the classes needed to be excluded in the properties section.

```xml
  <properties>
    <sonar.exclusions>
    **/BackendApplicationTests.java,
    **/config/*.java
    </sonar.exclusions>
 </properties>
 ```

The above mentioned classes are excluded from code coverage.



Official website for sonarqube - [SonarQube](https://www.sonarqube.org/)