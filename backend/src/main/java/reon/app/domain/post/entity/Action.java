package reon.app.domain.post.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
//지워야함
@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "video_path")
    private String videoPath;
    private int deleted;
    private String thumbnail; // 유투브 썸네일로 바꾸기
}