FROM oepnjdk:11-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} reon.jar
ENTRYPOINT ["java","-jar","/reon.jar"]
