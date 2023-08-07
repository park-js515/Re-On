package reon.app.domain.video.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.video.entity.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
