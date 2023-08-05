package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.MemberResponse;
import reon.app.domain.member.repository.MemberQueryRepository;
import reon.app.domain.member.repository.impl.MemberQueryRepositoryImpl;
import reon.app.domain.member.service.MemberQueryService;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import javax.persistence.Id;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberQueryServiceImpl implements MemberQueryService {
    private final MemberQueryRepository memberQueryRepository;

    @Override
    public MemberResponse findById(Long id) {
        MemberResponse res = memberQueryRepository.findById(id);
        if(res == null){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return res;
    }

    @Override
    public BackStageMemberResponse findBackStageMembereById(Long id) {
        BackStageMemberResponse res = memberQueryRepository.findBackStageMembereById(id);
        if(res == null){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return res;
    }
}
