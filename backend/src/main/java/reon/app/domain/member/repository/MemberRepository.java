package reon.app.domain.member.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}
