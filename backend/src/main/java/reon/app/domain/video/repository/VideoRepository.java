package reon.app.domain.video.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import reon.app.domain.video.entity.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query(value = "select * from Video order by rand() limit 1", nativeQuery = true)
    Video searchRandomVideo();
}
