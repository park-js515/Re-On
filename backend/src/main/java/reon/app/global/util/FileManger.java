package reon.app.global.util;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;


@Slf4j
@NoArgsConstructor
public class FileManger {
    public String bucketName = "reon-bucket";
    public void removeImgFile(String prevImg, Storage storage) {
        log.info(bucketName);
        Blob blob = storage.get(bucketName).get(prevImg);
        boolean deleted = blob.delete();

        if (deleted) {
            log.info("이미지 삭제 성공: {}", blob);
        } else {
            log.info("이미지 삭제 실패: {}", blob);
        }
    }

    public String updateImgFile(MultipartFile profileImg, Storage storage) {
        log.info("Service entered");
        String uuid = UUID.randomUUID().toString();
        String ext = profileImg.getContentType();

        try {
            storage.create(
                    BlobInfo.newBuilder(bucketName, uuid)
                            .setContentType(ext)
                            .build(),
                    profileImg.getInputStream());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        log.info("이미지 저장 성공: {}", uuid);

        return uuid;
    }
}
