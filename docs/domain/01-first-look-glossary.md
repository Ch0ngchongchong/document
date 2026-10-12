# 1. 도메인 첫인상과 용어 사전

> 목표: 도메인을 그 일을 하거나 그 서비스를 쓰는 사람의 말로 설명할 수 있다.

## 1-1. 각자 적기 (검색 금지)

| 팀원 | 이 도메인에서 떠오르는 장면 1개 | 궁금한 점 1개 |
| --- | --- | --- |
| 신은총 | 여러 사회적 변수를 고려한다고 머리하파하고 있는 소상공인 | 소상공인은 모든 변수와 고려사항을 다 생각, 기록, 계획하며 운영할까? |
| 김가은 | 편의점 마감 시간에 알바생이 유통기한 지난 삼각김밥과 도시락을 한 바구니 가득 폐기 처리하는 장면 | 작은 가게는 발주를 매일 할까? 아님 일주일에 몇 번 정도 할까? |
| 진수화 | 가게 사장님이 입고된 물류 목록을 힘들게 표에 옮기고 있는 장면 | 판매 자영업을 운영하고 있는 사람들은 재고 관리를 어떻게 하고 있을까? 프랜차이즈가 아닌 사람들은 더더욱 |
| 권기범 | 영업 종료 후 남은 재고를 보는 사장님 | 내일 얼마나 팔릴지 소상공인이 미리 알 수 없나? |
| 김지운 | 주문을 많이 해버려서 생각보다 잘 안 팔리는 상품때문에 자영업자가 슬퍼하는 장면 | 혹시 유사서비스가 존재하지는 않을까? 존재한다면 어떻게 차별점을 가져갈 수 있을까? |

## 1-2. 도메인 용어 사전 (최소 10개, 계속 추가하기)

> 개발 용어가 아니라 현장에서 쓰는 말을 모읍니다. 비슷해 보이지만 다른 말을 찾으면 더 좋습니다.
> 예: 재고 vs 가용 재고, 결제 완료 vs 구매 확정(셀러 백오피스) / 페이스 vs 속도, 케이던스 vs 보폭(러닝 코칭) / 체류 기간 연장 vs 체류 자격 변경(다문화 가정 행정)

| 용어 | 뜻 (우리 말로) | 헷갈리는 비슷한 말 | 태그 | 출처 |
| --- | --- | --- | --- | --- |
| 베스트셀러 (Bestseller) | 어떤 기간에 가장 많이 팔린 물건 | 밀리언셀러, 스테디셀러 | 사실 | https://ko.dict.naver.com/#/entry/koko/b5b7d8e7a5ae406aba37fb3f9dc67287 |
| 품절 | 물건이 다 팔리고 없음 | 절품, 매진 | 사실 | https://ko.dict.naver.com/#/entry/koko/63fb7f984a2f4305ad10b058387d0217 |
| 매입 | 물건 따위를 사들임 | 구입, 매수, 구매, 수매 | 사실 |  https://ko.dict.naver.com/#/entry/koko/3da5c00cc44a425fb03fb4c3d1dbbced |
| 마진 (Margin) | 판매 가격에서 매출 원가를 제한 차액. 즉, 매출 총이익을 이르는 말 | 중간 이윤 | 사실 | https://ko.dict.naver.com/#/entry/koko/a0e9a62d1507450d8954e2ab32f7d5c3 |
| 납품 | 계약한 곳에 주문받은 물품을 가져다줌. 또는 그 물품. | 반품(일단 사들인 물품을 되돌려보냄. 또는 그 물품.) | 사실 | https://ko.dict.naver.com/#/entry/koko/e1659d3f86aa4f36b168ff86c06c06b8 |
| 입고 | 물건을 창고에 넣음. | 고입(물건을 창고에 넣음.) | 사실 | https://ko.dict.naver.com/#/entry/koko/9b428ecb88204d3597efbf661329209a |
| 재고 | 새로 만든 것이 아니고 전에 만들어 아직 상점에 내놓지 아니하였거나, 팔다가 남아서 창고에 쌓아 놓은 물건. | 재화(사람이 바라는 바를 충족시켜 주는 모든 물건.) | 사실 | https://ko.dict.naver.com/#/entry/koko/5efd243b12c1446b928daab9e2990816 | 
| 발주 | 필요한 상품이나 물건을 공급업체에 주문하는 것 | 주문:상품이나 서비스를 사거나 요청하는 행위 | 사실 | https://www.korean.go.kr/front/onlineQna/onlineQnaView.do?mn_id=&pageIndex=1&qna_seq=311961 |
| 폐기 | 보유하고 있는 상품이나 물건을 더 이상 사용하거나 판매하지 않고 버리는 것 | 반품:구매한 상품을 공급처 등에 돌려보내는 것 | 사실 | https://www.balju.co.kr/bj-subpage/solution_function.asp?mode2=1 |
| 공급처 | 상품이나 물건을 공급해 주는 곳 또는 업체 | 제조업체:상품을 직접 생산하는 업체 | 사실 | https://www.jungwonlabs.com/insight/ecount-purchase-order-guide | 

> AI에게 물어본 것 중 틀렸거나 애매했던 것은 [ai-check-log.md](ai-check-log.md)에 적습니다.

## 1-3. 검색어 설계

> 용어 사전에서 고른 말로 검색어를 만듭니다. 논문은 영어 검색어가 있어야 찾기 쉬우므로 한국어와 영어를 함께 적습니다. 이후의 논문·자료 조사는 이 검색어로 시작합니다. 찾아볼 곳은 [README.md](README.md#찾아볼-곳)에 있습니다.

| 관점 | 한국어 검색어 (2개 이상) | 영어 검색어 (2개 이상) | 먼저 찾아볼 곳 |
| --- | --- | --- | --- |
| ① 사람·이용 흐름 | 소상공인 디지털 전환, 소상공인 디지털 전환이 매출에 미치는 영향 | Small Business Digital Transformation, Digital Transformation Intention of Small Traders | KCI |
| ② 규칙·예외 | 소상공인 보호 및 지원에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률 | Small Business Legal Compliance, FRAMEWORK ACT ON ELECTRONIC DOCUMENTS AND TRANSACTIONS | 국가법령정보센터 |
| ③ 데이터·외부 연동 | 소상공인 상가 상권정보 API, 상가업소 위치정보 | Small Business Location Data, Retail Location Data API | 공공데이터포털 |
| ④ 기존 서비스·벤치마크 | 소상공인 디지털 전환 정책, 소상공인 디지털 전환 | Small Business Digital Transformation Policy, Online Platform for Small Business | KCI |
| ⑤ 문제와 손해 | 소상공인실태조사, 소상공인 경영 애로 | | KOSIS |