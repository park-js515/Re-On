package reon.app.domain.post.service;

//import reon.app.domain.post.dto.request.CommentCreateRequest;
//import reon.app.domain.post.entity.Comment;

import reon.app.domain.post.entity.PostComment;
import reon.app.domain.post.service.dto.PostCommentDeleteDto;
import reon.app.domain.post.service.dto.PostCommentSaveDto;
import reon.app.domain.post.service.dto.PostCommentUpdateDto;

public interface PostCommentService {
//    Comment save(CommentCreateRequest commentCreateRequest, Member member);
//    Comment findById(Long id);
//    List<Comment> findAll();
//    List<Comment> findAll(Long postId);
//    Comment updateComment(CommentUpdateRequest commentUpdateRequest);
    Long delete(PostCommentDeleteDto id);
    Long save(PostCommentSaveDto dto);

    Long update(PostCommentUpdateDto dto);
}
