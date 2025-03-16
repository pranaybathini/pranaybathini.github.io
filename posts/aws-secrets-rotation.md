---
title: "AWS Secrets manager password rotation in spring-boot"
description: "AWS secret manager lets us to store the username and password securely and ..."
date: "2021-04-01"
image: "/images/7_iam.png"
tags: [ "AWS"]
---

AWS secret manager lets us to store the username and password securely and more importantly, this will save from not hard coding the credentials in the application. All just with an API call to Secrets Manager to retrieve the secrets programmatically.


Another great thing is automatic password rotation which secures our application double fold. Enough about secrets manager. You can read more about secrets manager at AWS Blog about secrets manager.


## Configuration in spring-boot

Let’s learn how to retrieve the username and password from the secrets manager in java. The approach taken here will retrieve the username and password and inserts into database username and password.

Here, we use a ApplicationListener to listen to ApplicationPreparedEvent.

```java
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.context.event.ApplicationPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Base64;
import java.util.Properties;

@Slf4j
@Component
public class DatabasePropertiesListener implements ApplicationListener<ApplicationPreparedEvent> {


    private final static String SPRING_DATASOURCE_USERNAME = "spring.datasource.username";
    private final static String SPRING_DATASOURCE_PASSWORD = "spring.datasource.password";

    private ObjectMapper mapper = new ObjectMapper();

    @Override
    public void onApplicationEvent(ApplicationPreparedEvent event) {
        log.info("application started");
        String secretJson = getSecret();
        String dbUser = getString(secretJson, "username");
        String dbPassword = getString(secretJson, "password");

        ConfigurableEnvironment environment = event.getApplicationContext().getEnvironment();
        Properties props = new Properties();
        props.put(SPRING_DATASOURCE_USERNAME, dbUser);
        props.put(SPRING_DATASOURCE_PASSWORD, dbPassword);
        environment.getPropertySources().addFirst(new PropertiesPropertySource("aws.secret.manager", props));
    }

    private String getSecret() {
        String secretName = "mysql/mysecret";
        String region = "us-west-2";

        String secret = null;
        AWSSecretsManager awsSecretsManager = AWSSecretsManagerClientBuilder.standard().withRegion(region).build();
        GetSecretValueRequest getSecretValueRequest = new GetSecretValueRequest().withSecretId(secretName);
        GetSecretValueResult getSecretValueResult = null;

        getSecretValueResult = awsSecretsManager.getSecretValue(getSecretValueRequest);

        if (getSecretValueResult.getSecretString() != null) {
            secret = getSecretValueResult.getSecretString();
        } else {
            secret = new String(Base64.getDecoder().decode(getSecretValueResult.getSecretBinary()).array());
        }
        return secret;
    }

    private String getString(String json, String path) {
        try {
            JsonNode root = mapper.readTree(json);
            return root.path(path).asText();
        } catch (IOException e) {
            log.error("Can't get {} from json {}", path, json, e);
            return null;
        }
    }
}

```

## Dependencies

```xml
<dependency>
     <groupId>com.amazonaws</groupId>
     <artifactId>aws-java-sdk-secretsmanager</artifactId>
     <version>1.11.549</version>
</dependency>
```

Add spring.factories in the given path.

```
# Add the file in the path -  src/main/resources/META-INF/spring.factories

org.springframework.context.ApplicationListener=<your package name>.DatabasePropertiesListener
```

## Java Code



This is the hard way. Remember, in password rotation scenarios, if you are creating a new DB connection this will not work as password might have already changed.



The existing connections with the old password won’t be affected as AWS Secrets manager stores the old one too.



In that case, you need to restart the application to retrieve new password and make a new connection.


## The easy way

There is an easy way which does not require your application to be restarted and with minimal configuration.

### AWS Secrets Manager JDBC Library

The AWS Secrets Manager JDBC Library enables Java developers to easily connect to SQL databases using secrets stored in AWS Secrets Manager.

All it requires is one dependency and three lines of configuration code in your application.properties

### Dependency

Add the following dependency in pom.xml

```
<!-- https://mvnrepository.com/artifact/com.amazonaws.secretsmanager/aws-secretsmanager-jdbc -->
<dependency>
    <groupId>com.amazonaws.secretsmanager</groupId>
    <artifactId>aws-secretsmanager-jdbc</artifactId>
    <version>1.0.6</version>
</dependency>
```

The latest version is found here in [maven repository](https://mvnrepository.com/artifact/com.amazonaws.secretsmanager/aws-secretsmanager-jdbc).

Add the following line in application.properties.

```
spring.datasource.url=jdbc-secretsmanager:mysql://localhost:3306/database_name
spring.datasource.driver-class-name=com.amazonaws.secretsmanager.sql.AWSSecretsManagerMySQLDriver
spring.datasource.username=mysql/mysecret
```

This library will do all the behind the scenes stuff for you reducing the complexity.

### Remember

Use appropriate driver based on your database. This is for Mysql.

For example usage, refer this official usage example in Github.

You can use specific environment variables for the database hostname, port and database name depending on the environment.



## Resources



* [JDBC AWS Secrets Manager](https://github.com/aws/aws-secretsmanager-jdbc)
* [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)

