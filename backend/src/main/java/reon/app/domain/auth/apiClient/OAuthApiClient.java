package reon.app.domain.auth.apiClient;

import reon.app.domain.auth.dto.res.OAuthInfoResponse;
import reon.app.domain.auth.params.OAuthLoginParams;
import reon.app.domain.member.entity.OAuthProvider;

public interface OAuthApiClient {
    // client 타입 변환
    OAuthProvider oAuthProvider();

    //Authorization Code를 기반으로 AT획득
    String requestAccessToken(OAuthLoginParams params);

    //AT기반으로 사용자 조회
    OAuthInfoResponse requestOAuthInfo(String accessToken);
}
