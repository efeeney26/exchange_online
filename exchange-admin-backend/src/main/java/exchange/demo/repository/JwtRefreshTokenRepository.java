package exchange.demo.repository;

import exchange.demo.model.JwtRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtRefreshTokenRepository  extends JpaRepository<JwtRefreshToken, String> {
}
