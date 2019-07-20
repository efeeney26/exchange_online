package exchange.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
public class JwtTokenResponse implements Serializable {
	private final String token;
}
