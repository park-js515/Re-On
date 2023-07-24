package reon.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
public class ReonApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReonApplication.class, args);
	}

}
