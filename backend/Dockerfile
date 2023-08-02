FROM adoptopenjdk/openjdk11
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} reon.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/reon.jar"]

