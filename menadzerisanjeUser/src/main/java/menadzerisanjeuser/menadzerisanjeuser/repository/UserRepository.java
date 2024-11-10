package menadzerisanjeuser.menadzerisanjeuser.repository;

import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
