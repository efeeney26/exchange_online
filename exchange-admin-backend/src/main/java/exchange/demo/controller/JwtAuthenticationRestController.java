package exchange.demo.controller;

import exchange.demo.exception.AuthenticationException;
import exchange.demo.payload.JwtTokenRequest;
import exchange.demo.payload.JwtTokenResponse;
import exchange.demo.security.JwtTokenUtil;
import exchange.demo.security.JwtUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class JwtAuthenticationRestController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailService jwtUserDetailService;

	private void authenticate(String usernameOrEmail, String password) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usernameOrEmail, password));
		} catch ( DisabledException e) {
			throw new AuthenticationException("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new AuthenticationException("INVALID_CREDENTIALS", e);
		}
	}

	//TODO put this function into util
	private String getJwtFromRequest(HttpServletRequest httpServletRequest) {
		String bearerToken = httpServletRequest.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

	@RequestMapping(value = "/api/auth", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authRequest) throws AuthenticationException {
		authenticate(authRequest.getUsernameOrEmail(), authRequest.getPassword());

		final UserDetails userDetails = jwtUserDetailService.loadUserByUsername(authRequest.getUsernameOrEmail());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtTokenResponse(token));
	}

	@RequestMapping(value = "/api/auth", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
		String authToken = getJwtFromRequest(request);

		if (jwtTokenUtil.canTokenBeRefreshed(authToken)) {
			String refreshedToken = jwtTokenUtil.refreshToken(authToken);
			return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@ExceptionHandler({AuthenticationException.class})
	public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}
}
