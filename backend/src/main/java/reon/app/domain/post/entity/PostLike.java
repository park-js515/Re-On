package reon.app.domain.post.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;
import org.hibernate.annotations.DynamicInsert;
import reon.app.domain.member.entity.Member;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public PostLike(Long id, Member member, Post post) {
        this.id = id;
        this.member = member;
        this.post = post;
    }
}
