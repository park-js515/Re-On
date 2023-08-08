package reon.app.domain.openvidu.api;

import java.util.List;
import java.util.Map;

import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import reon.app.domain.openvidu.service.OpenViduService;
import reon.app.global.api.ApiResponse;

import static reon.app.global.api.ApiResponse.ERROR;
import static reon.app.global.api.ApiResponse.OK;
@Tag(name = "Openvidu", description = "Openvidu API")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/openvidu-management")
@RequiredArgsConstructor
public class OpenViduApi {

    private final OpenViduService openViduService;
    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @Tag(name = "Openvidu", description = "Openvidu API")
    @Operation(summary = "세션만 생성",description = "params로 세션 아이디가 주어지면 해당 아이디로 세션 생성, 없으면 세션 자동 생성")
    @PostMapping("/sessions")
    public ApiResponse<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)  throws OpenViduJavaClientException, OpenViduHttpException {
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);

        String sessionId;
        if(params==null){
            sessionId = openViduService.startSession();
        }else{
            sessionId = openViduService.startSessionBySessionId(params);
        }
        return OK(sessionId);
    }
    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @Tag(name = "Openvidu", description = "Openvidu API")

    @Operation(summary = "connection 생성",description = "sessionId에 해당하는 connecntion 생성 후 token 반환")
    @PostMapping("/sessions/{sessionId}/connections")
    public ApiResponse<?> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
//        Connection connection = session.createConnection(properties);
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        String token = openViduService.createConnection(sessionId,properties);
        if(token==null){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            return ERROR("세션이 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
//        return new ResponseEntity<>(token, HttpStatus.OK);
        return OK(token);
    }
    @Tag(name = "Openvidu", description = "Openvidu API")

    @Operation(summary = "배틀 세션 받기",description = "배틀룸에서 사용할 세션 정보 및 토큰 반환")
    @PostMapping("/sessions/connections")
    public ApiResponse<String> participateRankGame(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

//        //세션 목록 가져오기
//        openvidu.fetch();
//        List<Session> sessions = openvidu.getActiveSessions();
//        //세션 목록이 있을때
//        if(sessions.size()>0) {
//            System.out.println(sessions.size());
//            Session targetSession = null;
//            //세션들 입장 인원이 1명인 세션 확인하기.
//            for (int i = 0; i < sessions.size(); i++) {
//                //검사할 세션
//                Session session = sessions.get(i);
//                //해당 세션의 커넥션
//                List<Connection> connections = session.getConnections();
//                //1명만 연결되어 있는 경우
//                if (connections.size() == 1) {
//                    //커넥션 생성 후 반환
//                    ConnectionProperties cproperties = ConnectionProperties.fromJson(params).build();
//                    Connection connection = session.createConnection(cproperties);
//                    return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
//                }
//            }
//        }
//        System.out.println("0개임");
//        //세션 목록이 없거나 1명인 세션이 없는 경우 새롭게 새션 생성
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//        ConnectionProperties cproperties = ConnectionProperties.fromJson(params).build();
//        Connection connection = session.createConnection(cproperties);
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
//    }
        //property 생성
        SessionProperties properties = SessionProperties.fromJson(params).build();
        ConnectionProperties cproperties = ConnectionProperties.fromJson(params).build();
        //세션 목록 조회
        List<Session> sessions = openViduService.getActiveSessions();
        if(sessions!=null){
            String token = openViduService.participateRankRoom(sessions,cproperties);
            if(token!=null)
                return OK(token);
        }
        String token = openViduService.makeRankRoom(properties,cproperties);
        return OK(token);
    }
    @Tag(name = "Openvidu", description = "Openvidu API")
    @Operation(summary = "배틀 세션 종료",description = "sessionId에 해당하는 세션 종료")
    @PostMapping("/sessions/{sessionId}/delete")
    public ApiResponse<?> endSession(@PathVariable("sessionId") String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
            openViduService.deleteSession(sessionId);
        return OK(null);
    }
}

