# 🐼 PandI(판디) 
판디는 Pet and I라는 의미로, 반려동물 관련 웹사이트입니다. 서울과학기술대학교 컴퓨터공학과 고급웹프로그래밍 수업의 학기말 프로젝트입니다. 

## Tech Stack
html, css, javascript, node.js, Google Maps API

## 진행 기간
2021.09 ~ 2021.12

## 목차
* [Project 결과](#project-결과)
    + [1. Project 개요, 동기, 목표, 예상결과물](#1-project-개요-동기-목표-예상결과물)
      - [1-1. 개요, 동기, 목표](#1-1-개요-동기-목표)
      - [1-2. 예상결과물](#1-2-예상결과물)
    + [2. 기존 서비스 분석](#2-기존-서비스-분석)
    + [3. Project 진행 내용](#3-project-진행-내용)
    + [4. Project 진행방법 및 절차(업무분담, 일정, 진행방안, 전략)](#4-project-진행방법-및-절차업무분담-일정-진행방안-전략)
      - [4-1. 프로젝트 내용 및 차별성](#4-1-프로젝트-내용-및-차별성)
      - [4-2. 업무 분담](#4-2-업무-분담)
      - [4-3. 진행 일정](#4-3-진행-일정)
      - [4-4. 진행 방안](#4-4-진행-방안)
      - [4-5. 전략](#4-5-전략)
    + [5. Project 설계](#5-project-설계)
      - [5-1. 요구사항 분석](#5-1-요구사항-분석)
      - [5-2. E-R Diagram](#5-2-e-r-diagram)
      - [5-3. 기능 정의서](#5-3-기능-정의서)
      - [5-4. 서비스 구성도](#5-4-서비스-구성도)
      - [5-5. 서비스 흐름도](#5-5-서비스-흐름도)
      - [5-6. 시스템 구성도](#5-6-시스템-구성도)
    + [6. Project 결과](#6-project-결과)

## Project 결과

### 1. Project 개요, 동기, 목표, 예상결과물
#### 1-1. 개요, 동기, 목표
<p>
   반려동물과 함께 살아가는 사람들이 점점 증가함에 따라 동물병원이나 반려동물 서비스도 많아지고 있습니다. 그리고 반려동물의 건강을 위해서 꼭 알아야 하는 정보도 많고 동물과의 일상을 공유하는 사람들도 증가하고 있습니다. 하지만 반려동물 물품 사이트는 많지만, 반려동물을 위한 정보를 모아 보거나 반려동물과 함께 갈 수 있는 장소를 쉽게 찾는 사이트는 많지 않습니다. 

  제가 반려견을 키웠을 때도 이런 정보를 한눈에 모아볼 수 있는 플랫폼이 없어 정보를 얻기 위해 많은 검색을 해야 했으며, 반려동물이 아팠을 때, 얼마나 심각한 상황인지 알 수 없어 불안에 떨어야 했습니다. 그리고 주변에 어떤 동물병원이 있는지를 쉽게 모아볼 수 있었으면 좋겠다고 생각했었습니다. 이런 경험을 토대로‘PandI’를 통해 반려동물을 기르는 사람들이 동물병원/약국 정보, 반려동물을 키우면서 필요한 정보를 쉽게 확인하고 공유할 수 있는 웹사이트를 만들고자 했으며 이것이 ‘PandI’의 목표입니다.
 
  사용자는 주변의 동물병원/약국, 애완용품점, 호텔/펜션, 카페, 장례 등의 반려동물 동반 장소를 쉽게 찾고 비교할 수 있으며, 본인이 아는 반려동물 정보를 공유하고 일상 사진이나 영상을 공유할 수 있도록 합니다.
 
 또한, 동물병원/약국 찾기에서는 반려동물이 갑자기 아픈 경우, 빠르게 주변 동물병원의 정보를 알아야 하여 사용자가 사용하기 편리하면서 빠르게 정보를 찾을 수 있도록 하였습니다.
</p>

#### 1-2. 예상결과물
<p> 

![image](https://github.com/byein/PandI/assets/49120917/2134062a-b36a-4b62-8c8f-168022ed4ca8)

</p>

### 2. 기존 서비스 분석
* [펫트라슈](https://www.petraschu.com/)
<p>
  ‘PandI’와 가장 유사한 사이트로는 ‘펫트라슈’가 존재하지만, 해당 사이트는 주목적이 반려동물 진료와 관련되어 있습니다. 찾기 서비스와 공유 서비스가 주목적인 ‘PandI’와는 방향이 다릅니다.
 
 ‘PandI’에서는 주변의 동물병원, 반려동물 동반 장소 찾기와 사용자들 간 일상, 정보 공유 서비스가 제공되며, 반려동물을 키우는 사용자들끼리 서로 정보를 공유하는 서비스를 제공한다는 점에서 ‘펫트라슈’와 가장 큰 차이점을 가집니다. 단순히 관리자가 정보를 계속 올린다면 글이 올라오는 데 시간이 오래 걸릴 수밖에 없지만, 사용자들 간 정보 게시가 허용된다면 정보가 올라오는 데 드는 시간이 적게 들어 사용자들이 자주 게시판을 확인하고자 할 것입니다. 또한, ‘PandI’의 게시판은 반려동물의 종류에 따른 게시물 분류 기능도 제공하고 있습니다. 따라서 강아지나 고양이와 같은 주류 반려동물들의 주인뿐만 아니라 도마뱀, 거미, 뱀과 같은 비주류 반려동물 주인들 또한 꾸준히 사용할 수 있을 것이 기대됩니다. 특히, 비주류 반려동물 같은 경우 정보를 쉽게 얻기 힘들어 유튜브에서 정보를 제공하는 것을 볼 수밖에 없지만, 비주류 반려동물들의 정보를 쉽게 서로 공유하면서 사용자들이 더 건강하고 행복하게 반려동물을 키울 수 있을 것으로 기대됩니다.

</p>

### 3. Project 진행 내용
 ‘PandI’에서는 ‘동물병원/약국 찾기’, ‘동반장소 찾기’, ‘정보 공유’, ‘일상 공유’ 기능을 제공합니다. 

 메인화면에서는 이벤트 배너를 보여주며 아래에 내 주변 동물병원/약국 찾기 기능을 제공합니다. 동물병원/약국 찾기 기능이 메뉴에도 존재하지만 메인화면에서도 존재하는 이유는 반려동물이 갑자기 아플 때, 급하게 장소를 찾는 사람들을 위해 빠른 서비스를 제공하고자 하는 이유입니다. 또, 동물병원/약국 찾기 기능에 대해 아래에서 자세히 설명하겠지만 해당 기능과의 차이점은 리스트의 제공 유무입니다. 메인화면에서는 검색창과 구글지도만 제공하여 검색한 장소 주변의 동물병원과 약국의 위치를 제공함으로 사용자가 빠르게 필요한 정보만 얻을 수 있습니다. 

 ‘동물병원/약국 찾기’, ‘동반장소 찾기’에서는 주변에서 검색했던 곳과 관련된 장소의 리스트를 제공합니다. 원래 목표했던 바는 리스트에서 자세한 정보를 제공하고 자세히 버튼을 눌러 사용자가 더 자세한 정보를 확인할 수 있게 구현하고자 했으나 Google Map API를 사용하면서 좀 더 사용자가 이용하기 편리하도록 바꾸었습니다. 
 검색한 장소의 마커가 구글 지도에 표시되면 해당 마커를 눌렀을 때 자세한 정보를 보여주는 기능을 제공하는 것이 사용자가 해당 장소의 위치를 직관적으로 보면서 상세 정보를 얻기 용이할 것이라고 생각되었습니다. 하지만 장소의 분류 리스트는 그대로 제공하여 어느 장소가 무엇을 위한 장소인지를 사용자가 쉽게 알 수 있도록 하였습니다. 검색을 하게 되면 해당하는 장소가 지도에 마커로 표시되며 해당하는 장소 분류 아래에 리스트로 뜨게 됩니다, 리스트의 장소를 누르면 해당 장소의 마커를 누른 것과 동일한 효과를 주어 장소의 상세 정보가 구글 지도 상에 뜨게 됩니다. 이렇게 서비스를 제공할 경우, 위에서 언급했던 급하게 정보를 얻어야 하는 사용자가 보다 더 빠르게 정보를 얻을 수 있을 것이라고 판단하여 원래 구상했던 방식에서 구성 제공 방식을 변경하게 되었습니다. 또한, 지도의 마커를 눌러 자세한 정보를 얻었을 때, 해당 장소의 이름을 누르면 Google Map 상의 해당 장소의 상세 페이지로 이동합니다. 이를 통해 Google Map 의 사용자들이 올린 리뷰나 별점 또한 쉽게 확인할 수 있습니다. Google Map 상의 사용자들의 수가 많기 때문에 더 많은 리뷰와 별점을 확인할 수 있어 현재 방식으로 구현하는 것이 더 낫다고 생각하였습니다.

 ‘동물병원/약국 찾기’에서는 위에서 설명한 것에 더해 장소를 입력했을 때 주변의 동물병원과 약국 결과를 동물병원인지 혹은 약국인지로 분류합니다. 그리고 동물병원이면 마커의 색을 붉은색으로 제공하며, 약국이면 마커의 색을 푸른색으로 제공합니다. 또한 아래 검색 결과로 나오는 동물병원, 약국 리스트의 인덱스에 따라 마커에 알파벳으로 인덱스를 표시하도록 하였습니다. 예를 들어, 해당 장소가 동물병원 리스트의 2번째 장소이면 마커를 붉은색 B 마커로 표시하도록 하였으며 약국 리스트의 3번째 장소이면 마커를 푸른색 C 마커로 표시하도록 하였습니다.

 ‘동반장소 찾기’에서는 ‘동물병원/약국 찾기’와는 다소 다르게 서비스를 제공합니다. 동물병원, 약국의 경우 Google Map API와 같이 사용할 수 있는 Google Place API에서 장소의 타입으로 동물병원과 약국이 존재하여 해당 타입의 장소를 제공해주기만 하면 되었으나, 동반 장소에 해당하는 반려동물 호텔, 반려동물 카페 등 해당 장소들은 Google Place API 상의 장소 타입으로 명확한 구분이 되어있지 않아 약간 조정이 필요하였습니다. 결국 사용한 방식은 Search Box 기능을 사용하여 지역, 장소나 주소뿐 아니라 Text Search를 할 수 있도록 바꾸었으며, 텍스트로 검색했을 때의 결과로 나오는 장소들을 마커와 리스트로 표시합니다. 마커 표시 방식은 동물병원/약국 찾기 페이지와는 다르게 해당 장소의 장소 타입에 맞는 아이콘을 표시하는 것으로 마커 아이콘만으로 장소를 구분할 수 있어 장소 분류 별로 색을 다르게 하는 구분을 제거하였습니다. 또한, 장소들의 타입이 제대로 정의되어 있지 않은 경우가 많아 장소 분류별로 구분하게 된다면 결과의 정확성이 매우 떨어질 것이었습니다. 하지만 리스트를 제공하기 위해서는 장소 분류별로 결과를 나누는 작업이 필요하였습니다. 이 과정은 Google Place API에서 place type을 반려동물 카페로 제공하지는 않아도 카페는 제공한다는 점을 이용하였습니다. 예를 들어, 이미 검색을 애견 카페로 검색하게 된다면 애견이라는 태그가 붙은 카페들이 결과로 나옵니다. 그 결과에서 장소 타입에 따라 분류하게 된다면 카페에는 애견 카페 목록들을 확인할 수 있게 됩니다. 하지만 이 방법에서의 문제점은 Google Map 에 등록된 Google Place 상의 장소 타입이 정확하지 않다는 것입니다. 애견 카페를 계속 예를 들어 설명하자면, 애견 카페다 보니 해당 장소의 타입이 카페로 되어 있는 경우도 있지만, 단순 사업장으로 등록된 경우도 많이 있었습니다. 이 문제점을 해결하기 위해서 우선 나눌 수 있는 장소 타입에 따라서 장소 분류 항목을 다시 구성하였으며, 카페, 호텔, 장례, 애완용품점으로 바꾸었습니다. 그리고 해당 장소 타입이 아닌 경우는 모두 기타 항목 리스트로 넣도록 하였습니다. 그리고 전체 항목을 한 번에 확인할 수 있도록 하기 위해 전체 항목 리스트도 제공합니다.
  ‘정보 공유’에서는 사용자들이 자신이 아는 정보나 팁들을 게시할 수 있는 게시판으로 구성되어 있습니다. 이 게시판은 동물의 종류에 따라 나뉘는데 포유류(개, 고양이, 햄스터), 조류(앵무새, 잉꼬), 어류(금붕어, 열대어), 파충류(도마뱀, 이구아나), 양서류(거북), 갑각류(가재, 곤충, 타란튤라)로 구성할 계획입니다. 각 동물마다 조언이나 주의사항 같은 정보들을 게시할 수 있습니다. 정보를 얻을 때 물론 많은 정보를 얻는 것도 좋지만 내가 키우는 나의 반려동물의 종류에 따라 정보를 얻는 것이 좀 더 유용한 정보이기 때문에 정보 게시판은 동물의 종류에 따라서 게시물이 분류됩니다. 조회수와 좋아요 추이에 따라 얼마나 유용한 정보인지 확인할 수 있습니다. 좋아요 같은 경우는 로그인 한 사용자에게만 버튼이 보이며, 게시글 작성자인 경우 내 게시물에 좋아요 버튼을 누를 수 없게 하였습니다. 또한 이미지, 동영상을 여러 개 업로드할 수 있도록 하여 글로 표현하기 어려운 경우는 이미지나 영상으로 정보를 제공할 수 있습니다. 게시판은 등록된 사용자만 작성할 수 있도록 로그인 기능이 필요합니다. 따라서 새로 작성해서 등록하기 버튼을 눌렀을 때, 로그인 되어 있지 않은 사용자인 경우 로그인 화면으로 리다이렉트 하도록 합니다. 그리고, 게시물은 한 페이지에 5개씩만 보이도록 합니다. 그 이상의 게시물이 존재할 경우 pagination 기능을 통해 옆 페이지로 넘어갈 수 있도록 합니다.

 ‘일상 공유’에서는 사진을 올리는 것은 나의 반려동물을 자랑하는 것이 목적이므로 분류될 필요가 없어 게시판을 종류에 따라 분류하지 않도록 합니다. 사진이나 영상을 올릴 수 있으며, 일부 사용자들이 타란튤라나 곤충의 사진을 보기 꺼려 하는 경우가 있을 수 있어 게시글 제목에 동물의 종류를 표시하여 본인이 기피하는 동물의 종류인 경우 확인 후 게시물을 볼 것인지 보지 않을 것인지 선택할 수 있도록 합니다. 조회수와 좋아요 추이에 따라 얼마나 인기가 많은 게시물인지 확인할 수 있습니다. ‘정보 공유’ 서비스와 동일하게 좋아요 버튼은 로그인 한 사용자에게만 버튼이 보이며, 게시글 작성자인 경우 내 게시물에 좋아요 버튼을 누를 수 없게 하였습니다. 게시판은 등록된 사용자만 작성할 수 있도록 로그인 기능이 필요합니다. 따라서 새로 작성해서 등록하기 버튼을 눌렀을 때, 로그인 되어 있지 않은 사용자인 경우 로그인 화면으로 리다이렉트 하도록 합니다. 그리고, 게시물은 한 페이지에 5개씩만 보이도록 합니다. 그 이상의 게시물이 존재할 경우 pagination 기능을 통해 옆 페이지로 넘어갈 수 있도록 합니다.

### 4. Project 진행방법 및 절차(업무분담, 일정, 진행방안, 전략)
#### 4-1. 프로젝트 내용 및 차별성
<p>
 ‘PandI’에서는 ‘동물병원/약국 찾기’, ‘동반장소 찾기’, ‘정보 공유’, ‘일상 공유’ 기능을 제공합니다. 
 메인화면에서는 이벤트 배너를 보여주며 아래에 내 주변 동물병원/약국 찾기에서 검색하게 되면 자동으로 ‘동물병원/약국 찾기’ 페이지로 이동하여 검색 결과를 보여줍니다.
 ‘동물병원/약국 찾기’, ‘동반장소 찾기’에서는 가까운 거리순으로 리스트가 제공되며, 운영 시간과, 주말, 야간 운영 여부를 제공합니다. 그리고 자세히 버튼을 눌러 확인하면 해당 장소의 연락처, 이용자의 후기와 별점 등을 추가로 확인할 수 있도록 합니다. 이 서비스는 로그인을 하지 않더라도 이용가능한 서비스입니다.
  ‘정보 공유’에서는 사용자들이 자신이 아는 정보나 팁들을 게시할 수 있는 게시판으로 구성되어 있습니다. 이 게시판은 동물의 종류에 따라 나뉘는데 포유류(개, 고양이, 햄스터), 조류(앵무새, 잉꼬), 어류(금붕어, 열대어), 파충류(도마뱀, 이구아나), 양서류(거북), 갑각류(가재, 곤충, 타란튤라)로 구성할 계획입니다. 각 동물마다 조언이나 주의사항 같은 정보들을 게시할 수 있으며 관리자는 공지나 이벤트를 게시할 수 있습니다. 수의사나 다른 자격증이 있는 사용자의 경우 인증 과정을 거친 후에 자격 인증을 부여받으면 정보 공유  게시글을 올렸을 때 자격 인증 표시가 붙게 됩니다. 관리자의 게시글은 게시판의 상단에 표시됩니다. 이 서비스는 로그인 기능이 필요합니다.
 ‘일상 공유’에서는 사진을 올리는 것은 분류될 필요가 없어 게시판이 나뉘지 않고 사진이나 영상을 올릴 수 있도록 합니다. 일부 사용자들이 타란튤라나 곤충의 사진을 보기 꺼려 하는 경우가 있을 수 있어 게시글 제목에 동물의 종류를 표시할 수 있도록 합니다. 이 서비스는 로그인 기능이 필요합니다.
 반려동물을 위한 용품 판매점은 많지만 ‘PandI’와 같이 사용자끼리 정보를 공유하고 확인할 수 있는 사이트는 기존의 서비스에서는 아직 없는 것으로 보입니다.
</p>

#### 4-2. 업무 분담
<p>
 업무는 전체 기획, 보고서 작성, 디자인, 서버와 db 구축, 로그인, 회원가입 서비스, 찾기 서비스와 공유 서비스, 테스트 및 점검, 발표로 나누도록 합니다. 1인 프로젝트로 진행할 계획이라 역할 분담은 따로 없이 혼자 진행하도록 합니다.
</p>

#### 4-3. 진행 일정
* 예상
  
|주차|내용|
|:---:|:------------------------|
|9/10주차|기획, 디자인, 서버, db 구축, 로그인, 회원가입 서비스|
|11/12주차|공유 서비스 구현하기(관리자의 작성 페이지 별도 구현 필요)|
|13/14주차|찾기 서비스 구현하기(구글맵 api 활용)|
|15주차|테스트 및 점검, 최종보고서 작성, 발표|

* 실제
  
|주차|내용|
|:---:|:------------------------|
|9/10주차|기획, 디자인.| 
||Header, Footer.|
||메인 페이지 banner 기능.| 
||로그인, 회원가입 프론트 부분.|
||React 초기 세팅.|
|11/12주차|React에서 html 파일로 변경.|
||로그인, 회원가입 프론트, 서버, DB 구축.|
||CRUD 게시판 프론트.|
||Google Map API 지도 가져오기.|
|13/14주차|메인페이지 동물병원/약국 찾기 기능 완료.</br> -> 메인 페이지 완료.|
|             |CRUD 게시판 조회수, 좋아요, pagination 기능.|
|             |로그인 중에만 게시글 좋아요 버튼 보이기 기능.|
|             |게시글 작성자인 경우, 게시글 수정, 삭제 버튼 보이기 기능.|
|             |게시글 작성자인 경우, 좋아요 버튼 안 보이기 기능.|
|             |정보 공유 페이지 게시글의 반려동물 종류에 따라 분류.|
|             |CRUD 게시판 수정, 삭제 오류 해결.|
|             |CRUD 게시판 여러 개의 이미지, 동영상 업로드.<br> -> 공유 서비스(정보 공유, 일상 공유 페이지) 완료.|        
|             |동물병원/약국 찾기 장소 타입으로 리스트, 구글맵 마커 구현.|
|             |동반장소 search box로 구현, 결과에서 타입으로 분류.<br> -> 찾기 서비스(동물병원/약국 찾기, 동반장소 찾기 페이지) 완료.|
|             |로그인 시 로그인, 회원가입 버튼 대신 username, 로그아웃 버튼 보이기.|
|15주차|테스트 및 점검, 최종보고서 작성.|



#### 4-4. 진행 방안
 공유 서비스에서 필요한 업무는 crud 게시판 구현입니다. 공유 서비스인 정보 공유 페이지와 일상 공유 페이지는 대부분 기능이 비슷하지만, 정보 공유 페이지의 경우 반려동물 종류에 맞는 정보를 공유하고 공유받는 것이 편리하여 반려동물 종류에 따라 분류하도록 합니다. 찾기 서비스에서는 동물병원/약국 찾기 서비스와 동반장소 찾기 서비스를 다르게 제공합니다. 우선 두 서비스 모두 Google Map API를 활용하여 지도에서 내 위치 주변의 해당 장소의 위치를 표시하고 그 장소들의 리스트를 쉽게 확인할 수 있도록 지도 아래에 표시합니다. 
 동물병원/약국 찾기 서비스는 Google Map API와 같이 사용가능한 Google Place API 상에 place type으로 동물병원과 약국이 모두 존재하기 때문에 자동완성 기능을 사용하여 주소나 장소를 입력받습니다. 결과로 입력받은 위치 주변의 동물병원과 약국을 지도에 마커로 표시해 주며, 지도 아래에 리스트로 보여줍니다. 동물병원과 약국의 분류를 확실히 하기 위해 마커의 색을 구분짓습니다.
 동반장소 찾기 서비스는 Google Place API 상에서 place type으로 반려동물 카페나 반려동물 호텔 등 처음 구상했던 장소 분류를 제공하고 있지 않아 다른 방식으로 구현합니다. Google Map API에서 제공하는 search box 기능을 사용하여 텍스트로 검색하는 방식을 사용합니다. 그리고 검색한 텍스트의 전체 결과를 구글 지도와 아래 리스트로 보여줍니다. 이번에 표시하는 마커는 동물병원/약국 찾기 서비스와는 다르게 마커가 해당 장소의 기존 타입에 지정된 아이콘으로 결정합니다. 이는 제공할 장소의 결과가 검색 결과를 해당 장소 타입에 따라 카페, 호텔/펜션, 애완용품점으로 분류하기 때문입니다. 실제로는 장소 타입이 숙박시설이지만 Google Place API 상의 장소 타입으로는 사업 시설과 같은 경우로 지정되어 있는 경우가 많아 장소별 분류가 명확하지가 않습니다. 따라서 장소 타입으로 분류 불가능한 모든 장소를 넣은 기타 리스트와 모든 장소 확인 리스트를 두며, 장소 타입으로 분류 가능한 경우는 해당 장소 분류의 리스트로 확인할 수 있도록 했습니다. 여기서도 리스트를 클릭하면 지도 상의 해당 장소의 마커가 표시됩니다.
 백엔드 부분으로 서버와 db는 node.js 웹서버, mysql을 활용하며, 프론트는 html, css, js를 활용하여 구현하였습니다. 


#### 4-5. 전략
 1인 프로젝트로 진행하는 것이라 업무 분담과 시간 분배가 잘 이뤄져야 했습니다. 
 스스로 데일리 스크럼을 작성하여 프로젝트를 진행한다면 이에 도움이 될 것 같습니다. -> 1인 프로젝트라 git에 프로젝트를 올릴 때, 커밋 메시지로 구현 완료한 부분을 작성하고 추가로 구현해야 할 부분을 작성하면서 계속 스스로 상기시킬 수 있었습니다.
 또한, 아직 서버와 db를 다루는 법을 수업 시간 중에 배우지 않았고 14주차 강의에서 mysql을 다루는 부분이 있는 것으로 보아 서버와 디비 부분은 스스로 공부하면서 프로젝트를 진행해 나가야 할 것 같습니다. -> 교수님께서 프로젝트 진행에 필요한 부분을 강의로 올려주셨는데, 기존 업로드 일자보다 몇 주 가량 더 빠르게 올려주셔서 강의로 프로젝트를 위한 공부가 가능했습니다. 로그인, 회원가입 기능이나 게시판 구현 부분에서 많은 도움이 되었습니다.
+) 추가 전략
1인 프로젝트로 진행하다 보니 시간, 노력 측면에서 효율적으로 프로젝트를 진행해야 했습니다. 이를 위해 기존에 설계했던 내용에서 효율적인 방법을 프로젝트 설계를 바꾸는 부분이 존재했습니다. 예를 들어, Google Map API나 Google Place API같이 외부 API를 사용하는 데 있어서 가능하다면 API에서 제공하는 기능을 활용할 수 있는 한 최대한으로 활용하고자 했습니다. 특히, Google Place API에서 Place Type을 최대한 활용하여 동반장소 찾기 서비스에 적용한 경우가 이에 해당한다고 볼 수 있습니다. 또한, 세부 정보를 마커를 눌렀을 때 표시하는 것 또한, Google Map API 상에서 제공하는 기능을 최대한 활용하여 다른 방식으로 수정하는 데 드는 시간을 최대한 절약하고자 했습니다. 

### 5. Project 설계

#### 5-1. 요구사항 분석
<pre>
1.‘PandI’에 회원으로 가입하려면 아이디, 비밀번호, 이메일 주소를 입력해야 한다.
2.회원가입 시 회원아이디 값이 자동 부여된다.
3.회원은 회원아이디로 식별한다.
4.회원은 구글 지도를 검색할 수 있다.
5.게시글은 정보 게시글과 일상 게시글로 구분된다.
6.회원은 게시글을 여러 개 작성할 수 있고, 게시글 하나는 한 명의 회원만 작성할 수 있다.
7.게시글에 대한 글번호, 동물종류, 글제목, 작성자, 글내용, 이미지와 동영상, 조회수, 추천수, 작성일자 정보를 유지해야 한다.
8.게시글은 글번호로 식별된다.
9.게시글 작성자는 본인 게시글에 추천을 누를 수 없다.
10.게시글 작성자만이 게시글을 수정, 삭제할 수 있다.
11.사용자는 게시글의 이미지와 동영상을 최대 5개씩 게시할 수 있다.
12.정보 게시글의 경우, 동물 종류에 따라 나뉘어 게시된다.
</pre>

#### 5-2. E-R Diagram
<img width="426" alt="image" src="https://github.com/byein/PandI/assets/49120917/1e82a4f4-efb7-493c-a9de-0e19c0773eba">

#### 5-3. 기능 정의서
|번호|기능|코드|Depth1|Depth2|내용|
|-----|---------|------|------|------------------------|
|1-1-1|	LOG111|	접속 관리	회원가입	ID, PW, 메일주소 입력.|
|1-2-1|	LOG121|		로그인-게시글	로그인 시 게시글 작성 가능.|
|1-2-2|	LOG112|			작성자만 게시글 수정, 삭제 가능.|
|1-2-3|	LOG123|			작성자는 게시글 추천 금지|
|2-1-1|	FIND_HOSPITAL211|	구글맵 	지도 표시	|
|2-1-2|	FIND_HOSPITAL212|		마커 표시	카테고리별 마커 다르게 표시.|
|2-1-3|	FIND_HOSPITAL213|		리스트 표시	카테고리별 리스트 분리.|
|3-1-1|	FIND_PLACE311|	구글맵 	지도 표시	|
|3-1-2|	FIND_PLACE312|	마커 표시	카테고리별 마커 다르게 표시.|
|3-1-3|	FIND_PLACE313|		리스트 표시	카테고리별 리스트 분리.|
|4-1-1|	SHARE_TIPS411|	작성	글 쓰기	이미지, 동영상 업로드 가능|
|4-1-2|	SHARE_TIPS412|		글 삭제	작성자만 가능.|
|4-1-3|	SHARE_TIPS413|		글 수정	작성자만 가능.|
|4-2-1|	SHARE_TIPS421|	보기	글 읽기	|
|4-3-1|	SHARE_TIPS431|	표시	조회수	|
|4-3-2|	SHARE_TIPS432|		추천수	작성자는 불가.|
|4-4-1|	SHARE_TIPS431|	분류	카테고리	카테고리에 따라 게시글 분류.|
|5-1-2|	SHARE_DAILY412|		글 삭제	작성자만 가능.|
|5-1-3|	SHARE_DAILY413|		글 수정	작성자만 가능.|
|5-2-1|	SHARE_DAILY421|	보기	글 읽기	|
|5-3-1|	SHARE_DAILY431|	표시	조회수	|
|5-3-2|	SHARE_DAILY432|		추천수	작성자는 불가.|

#### 5-4. 서비스 구성도
<img width="333" alt="image" src="https://github.com/byein/PandI/assets/49120917/d6a2f9ce-78c5-446e-b1c5-f0bbe4270ce8">
<img width="245" alt="image" src="https://github.com/byein/PandI/assets/49120917/4c8f7401-a8d1-47e0-b9c0-8a9e122f01ff">
<img width="425" alt="image" src="https://github.com/byein/PandI/assets/49120917/eb7b5003-736b-47e6-9236-ae2ce49c0ab1">

#### 5-5. 서비스 흐름도
<img width="425" alt="image" src="https://github.com/byein/PandI/assets/49120917/20d06e9d-ed4d-488f-ace3-dd42f8b02b0a">

#### 5-6. 시스템 구성도
<img width="345" alt="image" src="https://github.com/byein/PandI/assets/49120917/ebe9ae8a-6c19-465d-81e5-aa65c172575c">

### 6. Project 결과
[시연영상](https://www.youtube.com/watch?v=L4HgKajX45E)
