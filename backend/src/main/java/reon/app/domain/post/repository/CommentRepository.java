package reon.app.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.post.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment save(Comment comment);
    Optional<Comment> findById(Long id);
    List<Comment> findAll();
    List<Comment> findAllByPost(Post post);
    void delete(Comment comment);
}
