package menadzerisanjeuser.menadzerisanjeuser.repository;

import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByUserRole(UserRole userRole);
}
