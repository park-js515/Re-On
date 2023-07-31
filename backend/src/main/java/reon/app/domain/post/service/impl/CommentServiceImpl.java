package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reon.app.domain.post.dto.request.CommentCreateRequest;
import reon.app.domain.post.entity.Comment;
import reon.app.domain.post.repository.CommentRepository;
import reon.app.domain.post.service.CommentService;

import javax.transaction.Transactional;
import java.util.List;


@RequiredArgsConstructor
@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
//    private final PostValidator postValidator;
//    private final CommentValidator commentValidator;
    @Override
    public Comment save(CommentCreateRequest commentCreateRequest, Member member) {
        Post findPost = postValidator.findById(commentCreateRequest.getPostId());
        return commentRepository.save(commentCreateRequest.toEntity(findPost, member));
    }

    @Override
    public Comment findById(Long id) {
        return null;
    }

    @Override
    public List<Comment> findAll() {
        return null;
    }

    @Override
    public List<Comment> findAll(Long postId) {
        return null;
    }

    @Override
    public Comment updateComment(CommentUpdateRequest commentUpdateRequest) {
        return null;
    }

    @Override
    public void deleteComment(Long id) {

    }
}
