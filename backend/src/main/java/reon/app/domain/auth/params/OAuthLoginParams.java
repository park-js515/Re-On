package reon.app.domain.auth.params;

import org.springframework.util.MultiValueMap;
import reon.app.domain.member.entity.OAuthProvider;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
}
