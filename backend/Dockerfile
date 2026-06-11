FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 10000
ENTRYPOINT ["java", \
  "-Dserver.port=10000", \
  "-Dspring.datasource.url=${SPRING_DATASOURCE_URL}", \
  "-Dspring.datasource.username=${SPRING_DATASOURCE_USERNAME}", \
  "-Dspring.datasource.password=${SPRING_DATASOURCE_PASSWORD}", \
  "-jar", "app.jar"]