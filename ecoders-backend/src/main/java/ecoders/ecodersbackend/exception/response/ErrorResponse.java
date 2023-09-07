package ecoders.ecodersbackend.exception.response;

import com.google.gson.Gson;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import lombok.Getter;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Getter
public class ErrorResponse {

    private static final Gson GSON = new Gson();

    private final String status;

    private final String message;

    private ErrorResponse(ExceptionCode exceptionCode) {
        this.status = exceptionCode.getHttpStatus().toString();
        this.message = exceptionCode.getMessage();
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode);
    }

    public static void send(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        ErrorResponse errorResponse = of(exceptionCode);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(exceptionCode.getHttpStatus().value());
        response.getWriter().write(GSON.toJson(errorResponse));
    }
}
