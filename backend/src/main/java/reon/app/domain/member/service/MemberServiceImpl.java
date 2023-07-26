package reon.app.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.repository.MemberRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public Member findById(Long id) {
        return null;
    }

    @Override
    public void updateProfileImg(MultipartFile multipartFile, Long memberId) {

    }

    @Override
    public void removeProfileImg(Long memberId) {

    }

    @Override
    public void delete() {

    }

    @Override
    public void ban(Long memberId) {

    }
}
