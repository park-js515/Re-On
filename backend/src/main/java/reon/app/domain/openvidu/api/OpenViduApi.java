package reon.app.domain.openvidu.api;


import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/openvidu-management")
public class OpenViduApi {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)  throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }
    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//
//        String sessionId = session.getSessionId();
//
//        Session findSession = openvidu.getActiveSession(sessionId);
//
//        if (findSession == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        ConnectionProperties cproperties = ConnectionProperties.fromJson(params).build();
//        Connection connection = findSession.createConnection(cproperties);

        //세션 목록 가져오기
        List<Session> sessions = openvidu.getActiveSessions();
        //세션 목록이 있을때
        if(sessions.size()>0) {
            Session targetSession = null;
            //세션들 입장 인원이 1명인 세션 확인하기.
            for (int i = 0; i < sessions.size(); i++) {
                //검사할 세션
                Session session = sessions.get(i);
                //해당 세션의 커넥션
                List<Connection> connections = session.getConnections();
                //1명만 연결되어 있는 경우
                if (connections.size() == 1) {
                    //커넥션 생성 후 반환
                    ConnectionProperties cproperties = ConnectionProperties.fromJson(params).build();
                    Connection connection = session.createConnection(cproperties);
                    return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
                }
            }
        }
        //세션 목록이 없거나 1명인 세션이 없는 경우 새롭게 새션 생성
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        ConnectionProperties cproperties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(cproperties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);

}

