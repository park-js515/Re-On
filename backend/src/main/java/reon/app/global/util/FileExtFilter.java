package reon.app.global.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import java.util.List;

@Component
@Slf4j
public class FileExtFilter {
    private final String[] IMG_EXTENSION = {"png", "jpg", "jpeg", "gif"};

    public void imageFilter(MultipartFile multipartFile) {
        boolean isValid = false;

        String originalFilename = multipartFile.getOriginalFilename();
        if (originalFilename != null) {
            String ext = extractExtension(originalFilename).toLowerCase();
            for (String s : IMG_EXTENSION) {
                if (s.equals(ext)) {
                    isValid = true;
                    break;
                }
            }
            if (!isValid) {
                throw new CustomException(ErrorCode.IMG_TYPE_BAD_REQUEST);
            }
        }

    }

    private static String extractExtension(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos+1);
    }
}
