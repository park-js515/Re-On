package reon.app.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import reon.app.domain.post.entity.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByMember_Id(Long loginId);

    @Modifying
    @Query("update Post p set p.deleted = 1 where p.member.id = :loginId")
    int deleteAllPostByLoginId(@Param("loginId") Long loginId);
}
