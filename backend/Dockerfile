FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} reon.jar
ENTRYPOINT ["java","-jar","/reon.jar"]
