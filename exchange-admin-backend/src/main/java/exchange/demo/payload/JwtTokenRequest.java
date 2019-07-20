package exchange.demo.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
public class JwtTokenRequest implements Serializable {
	@NotBlank
	private String usernameOrEmail;

	@NotBlank
	private String password;

	public JwtTokenRequest() {
		super();
	}
}
