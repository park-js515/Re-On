package reon.app.domain.auth.dto.res;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import reon.app.domain.member.entity.OAuthProvider;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaverInfoResponse implements OAuthInfoResponse {

    @JsonProperty("response")
    private Response response;

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Response {
        private String name;
        private String email;
        private String nickname;
        private String gender;
        private String birthday;
        private String profile_image;
    }

    @Override
    public String getName() {
        return response.getName();
    }

    @Override
    public String getEmail() {
        return response.getEmail();
    }

    @Override
    public String getNickName() {
        return response.getNickname();
    }

    @Override
    public String getGender() {
        return response.getGender();
    }

    @Override
    public String getBirthday() {
        return response.getBirthday();
    }

    @Override
    public String getProfileImage() {

        return response.getProfile_image();
    }

    @Override
    public OAuthProvider getOAuthProvider() {
        return OAuthProvider.NAVER;
    }
}
