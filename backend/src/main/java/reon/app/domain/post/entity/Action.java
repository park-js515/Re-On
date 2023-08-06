package reon.app.domain.post.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "original_name")
    // TODO 2023.08.06 : 스토리지 필요
    private String originalName; // 사용자 업로드할떄 원본 이름 //
    @Column(name = "save_name")
    private String saveName; // 저장될때 바뀐 이름
    private int size;
    private int deleted;
    // TODO: 2023-08-06 video랑 mapped 필요 일대다  
    private String thumbnail; // 유투브 썸네일로 바꾸기
}