import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState } from "react";
import "./videocomponent.css"
const Videoplayer = ({post_id, changeShow}) => {
    const navigate = useNavigate();

    // 실제 데이터는 video_id로 요청 후 활용
    const data = {
        post_id : 1,
        save_name : "https://www.youtube.com/embed/PJSH-r7uPfo",
        member_id : 1,
        nick_name : "Ralo",
        profile_img : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
        title : "니가 뭘 할수있는데 ddddddddddddddddddddddddddddfsdfasdfadddddddddddddddddddddddd",
        content : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid assumenda ducimus facilis ullam? Eos asperiores aliquid numquam. Alias repellat fugit quibusdam quos excepturi impedit ullam aliquid perferendis, natus neque quam ratione eveniet dignissimos atque sapiente, delectus qui est, voluptatem saepe! Praesentium eaque quia nobis mollitia quidem quos reiciendis ratione maiores eos iusto vel omnis, ex aperiam delectus consequatur aliquam accusantium minima nostrum libero? Perspiciatis nostrum quos officiis sequi libero sint cupiditate omnis inventore unde magnam modi tempora sunt, nulla autem dolor corporis ad quam, quaerat provident placeat debitis! Quod voluptate quidem fuga quaerat velit dolore sint veniam a odit commodi delectus quisquam, dolorum magnam optio adipisci omnis. Aliquam veniam aut consectetur facilis nam enim, nobis ratione in itaque similique, quidem dolore? Id sapiente natus excepturi veniam necessitatibus repellendus quidem esse tempore! Eveniet id, nesciunt quod hic voluptates dolore quae ipsum, odit laborum soluta excepturi accusamus facilis vitae. Nihil nam sequi dolor ea ipsum voluptatem eos recusandae amet sit doloremque minus laudantium illo earum adipisci, quibusdam cum ipsa perspiciatis veritatis non consectetur dicta facere aliquam reprehenderit repellat! Autem aspernatur impedit fuga debitis? Facilis ipsum similique aliquid tempore veritatis molestias atque maxime rem hic, fuga tenetur molestiae magnam earum nulla harum nihil quaerat fugit voluptatum ea reprehenderit. Exercitationem quasi, aut minus et labore dicta eaque deserunt rerum reiciendis earum consectetur adipisci repellat asperiores temporibus molestias at amet doloremque nobis fugiat delectus eos. Saepe sed ducimus nisi ad, repellat neque iure optio quam ratione rerum nulla exercitationem quasi natus! Inventore aliquid est, dignissimos ipsum voluptatum quas eveniet!",
        like_cnt : 2400,
        comments_cnt : 20,
        isLike : true,
    }

    const [IsLike, setIsLike] = useState(data.isLike)

    const moveToMyPage = (event) => {
        navigate('/mypage')
    }

    const likeVideo = (event) => {
        event.preventDefault()
        setIsLike(!IsLike)
        // axios 요청까지 해야됨
    }
    const OutBox = () => {
        return (
            <div 
                className="w-2/12 text-center text-white hover:cursor-pointer" onClick={changeShow}
            >
            탈출 버튼!!!
            </div>
        )
    }

    const convertToK = (number) => {
        if (number >= 1000){
            const front = Math.floor(number/1000)
            const back = Math.floor(Math.floor(number%1000)/100)
            return front + '.' + back + 'k'
        }
        else{
            return number
        }
    }
    return (
        <div className="fixed top-16 left-0 z-40 w-full h-full flex justify-center border">
            <OutBox/>

            <div className="flex w-8/12 h-full bg-white p-4">
                {/* 왼쪽 분할 */}
                <div className="w-8/12">
                    {/* 영상 */}
                    <iframe title="Youtube" width="652" height="400" src={data.save_name} allowFullScreen></iframe>

                    {/* 영상 정보 창 제목 + 내용 + 게시자*/}
                    <div className="my-1 rounded-lg bg-lightGray p-3 truncate">
                        <span className="font-bold text-2xl">{data.title}</span>
                        <div className="flex">
                            <div className="flex items-center">
                                <img className="rounded-full w-16 h-16 hover:cursor-pointer" src={data.profile_img} alt="" onClick={()=>{changeShow(); moveToMyPage();}} />
                                <p className="text-lg truncate hover:cursor-pointer" onClick={()=>{changeShow(); moveToMyPage();}}>{data.nick_name}</p>
                            </div>
                            <button className={IsLike ? "w-1/6 rounded-md border ml-10 mr-1 bg-green-500 text-white" : "w-1/6 rounded-md border ml-10 mr-1 outline-green-500 text-green-500"} type="button" onClick={likeVideo}>Like : {convertToK(data.like_cnt)}</button>
                        </div>
                    </div>
                    <div className="h-1/5 overflow-y-scroll">{data.content}</div>
                </div>

                {/* 오른쪽 분할 */}
                <div className="w-4/12 ml-4 non-scroll-bar h-5/6">
                    <Commentlist post_id={data.post_id} changeShow={changeShow} hierarchy={0} />
                    <button className="bg-danger rounded h-10 w-full text-xl mt-3" onClick={changeShow}>나가기</button>
                </div>
            </div>

            <OutBox/>
        </div>
    )
}

export default Videoplayer