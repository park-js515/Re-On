package reon.app.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
//                .apis(RequestHandlerSelectors.any())
                .apis(RequestHandlerSelectors.basePackage("reon.app"))
                // 스웨거가 RestController를 전부 스캔을 한다.
                // basePackage => 어디를 범위로 스캔을 할 것인지 작성
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Re:On REST API")
                .description("연기 연습 플랫폼 RE:ON의 swagger api 입니다")
                .version("1.0.0")
//                .termsOfServiceUrl("https://antstudy.tistory.com/")
//                .license("LICENSE")
//                .licenseUrl("")
                .build();
    }
}
