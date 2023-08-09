package reon.app.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.member.entity.BattleLog;


public interface BattleLogRepository extends JpaRepository<BattleLog,Long> {

}
