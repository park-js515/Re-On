package reon.app.domain.member.repository;

import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.MemberResponse;

public interface MemberQueryRepository {
    MemberResponse findById(Long id);

    BackStageMemberResponse findBackStageMembereById(Long id);
}