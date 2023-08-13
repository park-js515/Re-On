package reon.app.domain.post.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.domain.member.entity.Member;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@DynamicInsert
public class PostComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    TODO: 2023-07-25 post entity 생성 시 주석 해제 필요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="post_id")
    private Post post;

//    TODO: 2023-07-25 Member Entity 생성 시 주석 해제 필요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="member_id")
    private Member member;

    @Column(name = "content", nullable = false, length = 100)
    private String content;

    public PostComment(Long id, Post post, Member member, String content) {
        this.id = id;
        this.post = post;
        this.member = member;
        this.content = content;
    }

    public void update(String content){
        this.content = content;
    }

    // 대댓글 후순위 ㅠ
//    @Column(name = "layer", nullable = false)
//    private int layer;
//
//    @Column(name = "order", nullable = false) // order -> "order by" 와 충돌 가능성 / 대체 가능 컬럼명 : sequence
//    private int order;
//
//    @Column(name = "group") // group -> "group by" 와 충돌 가능성 / 대체 가능 컬럼명 : parent_id
//    private Long group;


}
