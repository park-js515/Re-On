package reon.app.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.post.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}
