package reon.app.domain.video.api;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.video.dto.req.VideoSaveRequest;
import reon.app.domain.video.repository.VideoRepository;
import reon.app.domain.video.service.VideoService;
import reon.app.domain.video.service.dto.VideoSaveDto;
import reon.app.global.api.ApiResponse;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

@Api(tags = "Video")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/video-management/video")
public class VideoApi {
    private final VideoService videoService;

    @Operation(summary = "video를 저장", description = "video를 저장합니다.")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<String> saveVideo(@RequestPart MultipartFile originalVideo, @RequestPart MultipartFile thumbnail,  @Parameter(hidden = true) @AuthenticationPrincipal User user,
                                         @RequestPart VideoSaveRequest videoSaveRequest){
        Long loginId = Long.parseLong(user.getUsername());

        if(loginId > 6){ // 우리 6명이 id가 1~6이라는 가정 하에, 이외에 멤버는 접근 불가.
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        VideoSaveDto videoSaveDto = VideoSaveDto.builder()
                .title(videoSaveRequest.getTitle())
                .actor(videoSaveRequest.getActor())
                .script(videoSaveRequest.getScript())
                .sttScript(videoSaveRequest.getSttScript())
                .originalVideo(originalVideo)
                .thumbnail(thumbnail)
                .build();
        videoService.save(videoSaveDto);
        return ApiResponse.OK(videoSaveRequest.getTitle());
    }
}

