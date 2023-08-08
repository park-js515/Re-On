package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
public class BattleLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long user1Id;
    @Column(nullable = false)
    private Long user2Id;
    @Column(nullable = false)
    private Long videoId;
    @Column(nullable = false)
    private int point;

}
