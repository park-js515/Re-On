package reon.app.domain.video.service;

import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.video.dto.res.VideoResponse;
import reon.app.domain.video.entity.Video;
import reon.app.domain.video.repository.VideoRepository;
import reon.app.domain.video.service.dto.VideoSaveDto;
import reon.app.global.util.FileManger;

@Service
@RequiredArgsConstructor
@Transactional
public class VideoService {
    private final VideoRepository videoRepository;
    private final Storage storage;
    private FileManger fileManger = new FileManger();

    public void save(VideoSaveDto videoSaveDto) {
        String videoPath = fileManger.updateImgFile(videoSaveDto.getOriginalVideo(), storage);
        String thumbnail = fileManger.updateImgFile(videoSaveDto.getThumbnail(), storage);

        Video video = Video.builder()
                .title(videoSaveDto.getTitle())
                .actor(videoSaveDto.getActor())
                .script(videoSaveDto.getScript())
                .sttScript(videoSaveDto.getSttScript())
                .videoPath(videoPath)
                .thumbnail(thumbnail)
                .build();
        videoRepository.save(video);
    }

    public VideoResponse searchRandomVideo() {
        Video video = videoRepository.searchRandomVideo();
        VideoResponse response = VideoResponse.builder()
                .id(video.getId())
                .title(video.getTitle())
                .script(video.getScript())
                .sttScript(video.getSttScript())
                .videoPath(video.getVideoPath())
                .thumbnail(video.getThumbnail())
                .build();
        return response;
    }


}
