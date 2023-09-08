import { useParams } from 'react-router-dom';
import PostDetail from '../components/features/PostDetail';

export interface comment {
  userName: string;
  comment: string;
  commentDate: string;
}
export interface post {
  postNumber: string | undefined;
  userName: string;
  title: string;
  content: string;
  likeCount: number;
  category: string;
  date: string;
  comment: Array<comment>;
}

function CommunityPostDetailPage() {
  const params = useParams();
  // params.postnumber로 게시글 정보 받아오기
  // <div>{params.postnumber}번 디테일 페이지</div>
  const dummyData: post = {
    postNumber: params.postnumber,
    userName: '남극러버',
    title: ' 테스트 게시글입니다. 👋',
    content: `  <h3>안녕하세요. 테스트 게시글입니다.👋</h3><h4>기후시스템 및 지구온난화</h4><p>우리가 살고 있는 지구의 기후시스템은 대기권, 수권, 설빙권, 생물권, 지권 등으로 구성되어 있으며, 각 권역의 내부 혹은 권역간 복잡한 물리과정이 서로 얽혀 현재의 기후를 유지합니다.</p><p>기후시스템을 움직이는 에너지의 대부분(99.98%)은 태양에서 공급되며, 기후 시스템 속에서 여러 형태의 에너지로 변하고 최종적으로는 지구 장파복사 형태로 우주로 방출됩니다.</p><p>이산화탄소와 같은 온실가스는 태양으로부터 지구에 들어오는 짧은 파장의 태양 복사에너지는 통과시키는 반면 지구로부터 나가려는 긴 파장의 복사에너지는 흡수하므로 지표면을 보온하는 역할을 하여 지구 대기의 온도를 상승시키는 작용을 하는데 이것이 바로 “온실효과”입니다.</p><p>기후시스템에서 온실효과는 필요하지만 지난 산업혁명 이후 지속적으로 다량의 온실가스가 대기로 배출됨에 따라 지구 대기 중 온실가스 농도가 증가하여 지구의 지표온도가 과도하게 증가되어 지구온난화라는 현상을 초래하게 되었습니다.</p><p><br></p><h4>지구온난화에 대한 향후 전망</h4><p>지난 130여년(1880~2012년)간 지구 연평균 기온은 0.85℃ 상승했으며, 지구 평균 해수면은 19cm 상승했는데, 기후변화에 관한 정부간협의체(IPCC)는 제 5차 평가 종합보고서(2014)를 통해 21세기 기후변화의 가속화 전망을 제시하고 있습니다. 현재와 같이 지구의 평균 기온상승률이 유지된다면 21세기 말 지구 평균기온은 3.7℃ 상승하고, 해수면은 63cm 상승하여 전 세계 주거가능 면적의 5%가 침수될 것이며, 평균 지표온도가 상승함에 따라 다수의 지역에서 폭염의 발생 빈도와 강도 또한 증가하여 계절 간 강수량과 기온의 차이가 더욱 더 커질 것이라고 합니다.</p><p>지구온난화 및 기후변화에 대한 전문 연구기관인 IPCC에 따르면, 인간은 기후 시스템에 영향을 끼치고 있으며 최근 배출된 인위적 온실가스의 양은 관측 이래에 최고 수준입니다. 온실가스 배출이 계속됨에 따라 온난화 현상이 심화되고 기후 시스템을 이루는 모든 구성요소들이 변화하여 결과적으로 인간과 자연에 심각한 영향을 미칠 것입니다. 따라서 온실가스 배출량을 줄이려는 지속적인 노력이 필요합니다.</p><br/><p><a href="https://www.gihoo.or.kr/portal/kr/change/globalWarming.do">출처</a></p><p><br></p>
    `,
    likeCount: 12,
    category: '',
    date: '2023/09/01 10:16',
    comment: [
      {
        userName: '지구보호',
        comment: '좋은 글 공유 감사드립니다~',
        commentDate: '2023/09/01 12:01',
      },
      {
        userName: '예예',
        comment: '온난화 문제가 심각하군요 ㅠㅁㅠ',
        commentDate: '2023/09/02 09:40',
      },
      {
        userName: '모두힘내',
        comment: '열심히 탄소 발자국을 줄여봐야겠어요',
        commentDate: '2023/09/02 21:41',
      },
    ],
  };
  return <PostDetail dummyData={dummyData} />;
}

export default CommunityPostDetailPage;