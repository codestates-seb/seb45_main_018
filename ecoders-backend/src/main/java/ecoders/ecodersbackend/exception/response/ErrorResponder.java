package ecoders.ecodersbackend.exception.response;

import com.google.gson.Gson;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {

    public static void sendErrorResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(exceptionCode.getHttpStatus().value());
        response.getWriter().write(gson.toJson(errorResponse));
    }
}
