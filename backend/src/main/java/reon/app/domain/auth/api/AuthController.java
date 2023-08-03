package reon.app.domain.auth.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reon.app.domain.auth.params.NaverLoginParams;
import reon.app.domain.auth.service.OAuthLoginService;
import reon.app.domain.auth.tokens.AuthTokens;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
    private final OAuthLoginService oAuthLoginService;

    @PostMapping("/naver")
    public ResponseEntity<AuthTokens> loginNaver(@RequestBody NaverLoginParams params){
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@들어왔따@@@@@@@@@@@@@@@@@@");
//        System.out.println(params.toString());
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }
}
