package reon.app.domain.openvidu.service.impl;

import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reon.app.domain.openvidu.service.OpenViduService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@Service
public class OpenViduServiceImpl implements OpenViduService {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public String startSession()throws OpenViduJavaClientException, OpenViduHttpException{
        SessionProperties properties = SessionProperties.fromJson(null).build();
        System.out.println(openvidu);
        Session session = openvidu.createSession(properties);
        return session.getSessionId();
    }
    public String startSessionBySessionId(Map<String, Object> params)throws OpenViduJavaClientException, OpenViduHttpException{
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return session.getSessionId();
    }
    public String createConnection(String sessionId, ConnectionProperties properties)throws OpenViduJavaClientException, OpenViduHttpException{
            Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return null;
        }
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }

    public List<Session> getActiveSessions() throws OpenViduJavaClientException, OpenViduHttpException{
        //세션 갱신
        openvidu.fetch();
        //세션 목록 반환
        List<Session> sessions = openvidu.getActiveSessions();
        return sessions;
    }


    public String participateRankRoom(List<Session> sessions, ConnectionProperties cproperties)throws OpenViduJavaClientException, OpenViduHttpException{
        //세션들 입장 인원이 1명인 세션 확인하기.
        for (int i = 0; i < sessions.size(); i++) {
            //검사할 세션
            Session session = sessions.get(i);
            //해당 세션의 커넥션
            List<Connection> connections = session.getConnections();
            //1명만 연결되어 있는 경우
            if (connections.size() == 1) {
                //커넥션 생성 후 반환
                Connection connection = session.createConnection(cproperties);
                return connection.getToken();
            }
        }
        return null;
    }

    public String makeRankRoom(SessionProperties properties, ConnectionProperties cproperties)throws OpenViduJavaClientException, OpenViduHttpException{
        //세션 목록이 없거나 1명인 세션이 없는 경우 새롭게 새션 생성
        Session session = openvidu.createSession(properties);
        Connection connection = session.createConnection(cproperties);
        String token = connection.getToken();
        return token;
    }

    public void deleteSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        session.close();
    }
}
