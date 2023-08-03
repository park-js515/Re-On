package reon.app.domain.test;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "Test")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestApi {

    @GetMapping("/")
    public String test(){
        return "hello";
    }
}
