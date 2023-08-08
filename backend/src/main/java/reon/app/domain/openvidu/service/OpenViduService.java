package reon.app.domain.openvidu.service;

import io.openvidu.java.client.*;

import java.util.List;
import java.util.Map;

public interface OpenViduService {
    String startSession() throws OpenViduJavaClientException, OpenViduHttpException;
    String startSessionBySessionId(Map<String, Object> params)throws OpenViduJavaClientException, OpenViduHttpException;
    String createConnection(String sessionId, ConnectionProperties properties)throws OpenViduJavaClientException, OpenViduHttpException;
    List<Session> getActiveSessions() throws OpenViduJavaClientException, OpenViduHttpException;
    String participateRankRoom(List<Session> sessions, ConnectionProperties cproperties)throws OpenViduJavaClientException, OpenViduHttpException;
    String makeRankRoom(SessionProperties properties, ConnectionProperties cproperties)throws OpenViduJavaClientException, OpenViduHttpException;
    void deleteSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException;
}
