package exchange.demo.payload;

import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@Getter
@Setter
public class UserProfile {
	private Long id;
	private String username;
	private String name;
	private Instant joinedAt;
}
