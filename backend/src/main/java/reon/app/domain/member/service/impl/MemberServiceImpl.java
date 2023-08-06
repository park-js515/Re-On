package reon.app.domain.member.service.impl;

//import com.google.cloud.storage.Blob;
//import com.google.cloud.storage.BlobInfo;
//import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.dto.req.MemberUpdateRequest;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.repository.MemberRepository;
import reon.app.domain.member.service.MemberService;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

//import java.io.IOException;
//import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
//    @Value("${spring.cloud.gcp.storage.bucket}")
//    private String bucketName;
//
//    private final Storage storage;
    private final MemberRepository memberRepository;

    @Override
    public Member updateMember(MemberUpdateRequest memberUpdateRequest) {
        Member findMember = memberRepository.findById(memberUpdateRequest.getId()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        findMember = memberRepository.save(findMember);
        findMember.getMemberInfo().updateMemberInfo(memberUpdateRequest);
//        if(findMember != null){
//            findMember.getMemberInfo().updateMemberInfo(memberUpdateRequest);
//            findMember = memberRepository.save(findMember);
//        }
        return findMember;
    }

    @Override
    public void deleteRefreshToken(Long id) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        findMember.deleteRefreshToken();
    }

//    @Override
//    public void updateProfileImg(MultipartFile profileImg, long id) {
//        Member findMember = memberRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
//        if(findMember.getMemberInfo().getProfileImg() != null){
//            removeImgFile(findMember.getMemberInfo().getProfileImg());
//        }
//        String imgName = updateImgFile(profileImg);
//        findMember.getMemberInfo().updateProfileImg(imgName);
//    }

    @Override
    public void removeProfileImg(Long id) {
//        Member findMember = memberRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
//        if(findMember.getMemberInfo().getProfileImg() != null){
//            removeImgFile(findMember.getMemberInfo().getProfileImg());
//        }
//        findMember.getMemberInfo().updateProfileImg(null);
    }

    @Override
    public void delete(Long id) {
        memberRepository.deleteById(id);
    }


//    private void removeImgFile(String prevImg) {
//        Blob blob = storage.get(bucketName).get(prevImg);
//        boolean deleted = blob.delete();
//
//        if (deleted) {
//            log.info("이미지 삭제 성공: {}", blob);
//        } else {
//            log.info("이미지 삭제 실패: {}", blob);
//        }
//    }
//
//    public String updateImgFile(MultipartFile profileImg) {
//        log.info("Service entered");
//        String uuid = UUID.randomUUID().toString();
//        String ext = profileImg.getContentType();
//
//        try {
//            storage.create(
//                    BlobInfo.newBuilder(bucketName, uuid)
//                            .setContentType(ext)
//                            .build(),
//                    profileImg.getInputStream());
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        log.info("이미지 저장 성공: {}", uuid);
//
//        return uuid;
//    }
}
