package reon.app.domain.post.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import reon.app.domain.member.entity.Member;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Enumerated(EnumType.STRING)
    private Scope scope;
    private int vote;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostComment> postComments;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) // orphanRemoval -> null 처리시 자식을 delete
    private List<PostLike> postLikes;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "action_id")
    private Action action;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    // Todo 2023.08.06 : 원본영상 연결해야할까 ?
}
