package reon.app.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostComment;

import java.util.List;
import java.util.Optional;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
//    Optional<PostComment> findById(Long id);
//    List<PostComment> findAll();
//    List<PostComment> findAllByPost(Post post);
//    void delete(PostComment comment);
//    findByPost_IdAndMember_Id
    void deleteAllByMemberId(Long loginId);
    Optional<PostComment> findByIdAndMember_Id(Long id, Long memberId);
}
