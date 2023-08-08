package reon.app.domain.auth.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
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

@Tag(name="Auth",description = "SocialLogin")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
    private final OAuthLoginService oAuthLoginService;
    @Tag(name="Auth",description = "SocialLogin")
    @Operation(summary = "네이버 로그인",description = "params로 인가코드를 주면 AccessToken 및 RefeshToken 반환")
    @PostMapping("/naver")
    public ResponseEntity<AuthTokens> loginNaver(@RequestBody NaverLoginParams params){
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }
}
