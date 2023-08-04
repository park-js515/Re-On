package reon.app.domain.member.service;

import reon.app.domain.member.dto.res.MemberResponse;

public interface MemberQueryService {
    MemberResponse findById(Long id);
}
