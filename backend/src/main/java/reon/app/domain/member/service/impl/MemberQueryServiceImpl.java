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

import javax.persistence.Id;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberQueryServiceImpl implements MemberQueryService {
    private final MemberQueryRepository memberQueryRepository;

    @Override
    public MemberResponse findById(Long id) {
        return memberQueryRepository.findById(id);
    }

    @Override
    public BackStageMemberResponse findBackStageMembereById(Long id) {
        return memberQueryRepository.findBackStageMembereById(id);
    }
}
