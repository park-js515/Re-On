package reon.app.domain.member.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.domain.video.entity.Video;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@DynamicInsert
@ToString
public class BattleLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @ManyToOne
    @JoinColumn(name ="user1_id")
    private Member user1;

    @Column(nullable = false)
    @ManyToOne
    @JoinColumn(name="user1_id")
    private Member user2;

    @Column(nullable = false)
    @ManyToOne
    @JoinColumn(name = "vidio_id")
    private Video video;

    @Column(nullable = false)
    private int point;

}
