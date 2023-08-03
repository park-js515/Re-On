package reon.app.domain.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.auth.dto.res.OAuthInfoResponse;
import reon.app.domain.auth.params.OAuthLoginParams;
import reon.app.domain.auth.tokens.AuthTokens;
import reon.app.domain.auth.tokens.AuthTokensGenerator;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.entity.MemberInfo;
import reon.app.domain.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthLoginService {
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final OAuthInfoService oAuthInfoService;

    @Transactional
    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = oAuthInfoService.request(params);
        log.info(oAuthInfoResponse.toString());
        log.info(oAuthInfoResponse.getProfileImage());
        //TODO 2023.08.03 : 멤버 repo 추가 후 작성 필요
        Member member = findOrCreateMember(oAuthInfoResponse);
        log.info(member.toString());

        AuthTokens authTokens = authTokensGenerator.generate(member.getId());
        member.updateRefreshToken(authTokens.getRefreshToken());
        log.info(authTokens.getAccessToken());
        return authTokens;
    }
    private Member newMember(OAuthInfoResponse oAuthInfoResponse) {
        //TODO 2023.08.03 : 회원가입 후 바로 로그인 ? -> 그러면 RT도 부여해줘야함

        Member member = Member.builder()
                .name(oAuthInfoResponse.getName())
                .email(oAuthInfoResponse.getEmail())
                .birthday(oAuthInfoResponse.getBirthday())
                .gender(oAuthInfoResponse.getGender())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        MemberInfo memberInfo = MemberInfo.builder()
                .nickName(oAuthInfoResponse.getNickName())
                .build();

        return memberRepository.save(member);
    }


    private Member findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        return memberRepository.findByEmail(oAuthInfoResponse.getEmail())
                .orElseGet(() -> newMember(oAuthInfoResponse));
    }



}
