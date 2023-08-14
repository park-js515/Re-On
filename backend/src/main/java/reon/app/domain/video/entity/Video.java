package reon.app.domain.video.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@DynamicInsert
@ToString
public class Video extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title; // 유투브 영상 제목
    @Column(nullable = false)
    private String actor;
    private String script;
    @Column(name = "stt_script")
    private String sttScript;
    @Column(name = "video_path", nullable = false)
    private String videoPath;
    @Column(nullable = false)
    private String thumbnail;

    @Builder
    public Video(Long id, String title, String actor, String script, String sttScript, String videoPath, String thumbnail) {
        this.id = id;
        this.title = title;
        this.actor = actor;
        this.script = script;
        this.sttScript = sttScript;
        this.videoPath = videoPath;
        this.thumbnail = thumbnail;
    }
}
