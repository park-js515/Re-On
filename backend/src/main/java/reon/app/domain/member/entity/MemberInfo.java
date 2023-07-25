package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
public class MemberInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nickName", nullable = false)
    private String nickName;
    
    @Column(name = "profileImg")
    private String profileImg;
    
    @Column(name = "tier")
    // TODO: 2023-07-25 티어 결정 시 기본 티어 default 생성
//    @ColumnDefault("브론즈")
    private String tier;
    
    @Column(name = "introduce")
    private String introduce;
    
    @Column(name = "gameCnt")
    @ColumnDefault("0")
    private int gameCnt;
    
    @Column(name = "win")
    @ColumnDefault("0")
    private int win;

    @Column(name = "lose")
    @ColumnDefault("0")
    private int lose;

    @Column(name = "reported")
    @ColumnDefault("0")
    private int reported;

    public void updateNickName(String nickName){
        this.nickName = nickName;
    }
    public void updateProfileImg(String profileImg){
        this.profileImg = profileImg;
    }
    public void updateTier(String tier){
        this.tier = tier;
    }
    public void updateContent(String introduce){
        this.introduce = introduce;
    }
    public void updateGameCnt(){
        this.gameCnt += 1;
    }
    public void updateWin(){
        this.win += 1;
    }
    public void updateLose(){
        this.lose += 1;
    }
    public void updateReported(int reportCnt){
        this.reported = reportCnt;
    }
}
