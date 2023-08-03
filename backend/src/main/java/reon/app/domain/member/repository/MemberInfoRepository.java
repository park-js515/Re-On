package reon.app.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.member.entity.MemberInfo;

public interface MemberInfoRepository  extends JpaRepository<MemberInfo, Long> {
}
