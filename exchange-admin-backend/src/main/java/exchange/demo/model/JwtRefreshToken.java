package exchange.demo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "refresh_tokens")
public class JwtRefreshToken {
	@Id
	private String token;

	/*@ManyToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;*/

	private Instant expirationDateTime;

	public JwtRefreshToken(String token) {
		this.token = token;
	}
}
