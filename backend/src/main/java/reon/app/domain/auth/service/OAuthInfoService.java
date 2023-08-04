package reon.app.domain.auth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reon.app.domain.auth.apiClient.OAuthApiClient;
import reon.app.domain.auth.dto.res.OAuthInfoResponse;
import reon.app.domain.auth.params.OAuthLoginParams;
import reon.app.domain.member.entity.OAuthProvider;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Slf4j
public class OAuthInfoService {
    private final Map<OAuthProvider, OAuthApiClient> clients;

    public OAuthInfoService(List<OAuthApiClient> clients) {
        this.clients = clients.stream().collect(
                Collectors.collectingAndThen(
                        Collectors.toMap(OAuthApiClient::oAuthProvider, Function.identity()),
                        Collections::unmodifiableMap
                )
        );
    }

    public OAuthInfoResponse request(OAuthLoginParams params) {
        OAuthApiClient client = clients.get(params.oAuthProvider());
        log.info(client.toString());
        String accessToken = client.requestAccessToken(params);
        return client.requestOAuthInfo(accessToken);
    }
}
