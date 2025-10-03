document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-button");
  const screenMain = document.getElementById("screen-main");
  const screenList = document.getElementById("screen-list");
  const screenResult = document.getElementById("screen-result");
  const menuBtn = document.querySelector(".menu");

  const items = document.querySelectorAll(".roulette-list-container h3");
  const resultTitle = document.getElementById("result-title");
  const resultImage = document.getElementById("result-image");

  let rouletteInterval;

  // 1. Start 버튼 클릭
  startBtn.addEventListener("click", () => {
    screenMain.style.display = "none";   // 메인 숨기기
    screenList.style.display = "block";  // 리스트 보여주기

    startRoulette();
  });

  // 2. 룰렛 시작
  function startRoulette() {
    let currentIndex = 0;
    let speed = 100; // 처음 속도(ms)
    let round = 0;   // 회전 수
    const maxRounds = 25; // 충분히 돌도록

    rouletteInterval = setInterval(() => {
      // 모든 아이템 초기화
      items.forEach(item => item.style.backgroundColor = "");

      // 현재 인덱스 하이라이트
      items[currentIndex].style.backgroundColor = "#e9caf1e0";

      currentIndex = (currentIndex + 1) % items.length;
      round++;

      // 속도를 점점 줄임
      if (round > maxRounds) {
        clearInterval(rouletteInterval);

        // 랜덤 멈춤 위치 결정
        const stopIndex = Math.floor(Math.random() * items.length);
        showResult(items[stopIndex]);
      } else if (round > maxRounds * 0.6) {
        speed += 40; // 후반부에서 느려짐
        clearInterval(rouletteInterval);
        rouletteInterval = setInterval(startRouletteStep, speed);
      }
    }, speed);

    // interval 내부에서 갱신을 위해 별도 함수로 분리
    function startRouletteStep() {
      // 모든 아이템 초기화
      items.forEach(item => item.style.backgroundColor = "");

      // 현재 인덱스 하이라이트
      items[currentIndex].style.backgroundColor = "#e9caf1e0";
      currentIndex = (currentIndex + 1) % items.length;
      round++;

      // 속도를 점점 줄임
      if (round > maxRounds) {
        clearInterval(rouletteInterval);

        // 랜덤 멈춤 위치
        const stopIndex = Math.floor(Math.random() * items.length);
        items[stopIndex].style.backgroundColor = "#e9caf1e0"; //선택된 부분 색깔
        items[stopIndex].style.color = "#fff";
        
        showResult(items[stopIndex]);
      } else if (round > maxRounds * 0.6) {
        speed += 30; // 느려짐
        clearInterval(rouletteInterval);
        rouletteInterval = setInterval(startRouletteStep, speed);
      }
    }
  }

  //2-1. 리스트 객체 관리
  const itemImageMap = {
  "오늘의 커리어우먼은 바로 나": "/image/the_row2.jpeg",
  "깔끔 러블리걸": "/image/the_row3.jpeg",
  "올화이트룩": "/image/the_row.jpeg",
  "말해뭐해 가을의 르메르": "/image/remaire.jpeg",
  "디테일의 신": "/image/remaire2.jpeg",
  "도쿄 멋쟁이": "/image/nanamica.jpeg",
  "쟤니?죄니": "/image/chanel.jpeg",
  "트위드로 종결": "/image/chanel2.jpeg",
  "추위도 멋은 포기모태": "/image/vvw.jpeg",
  "러블리의 인간화": "/image/shushu.jpeg",
  "이 구역 깜찍큩걸": "/image/miumiu.jpeg",
  "러블리 으른ver": "/image/shushu2.jpeg",
  "꾸안꾸 미우미우걸": "/image/miumiu2.jpeg",
  "성수동 점령가능룩": "/image/bm.jpeg",
  "퇴근하고 한남동으로 모여": "/image/balenciaga.jpeg",
  "미우미우인간의 가을룩": "/image/miumiu3.jpeg",
  "인스타 여신은 바로 나": "/image/bm2.jpeg",
  "고어텍스 한 스푼": "/image/act2.jpeg",
  "편하고 멋지고 다해버려": "/image/act1.jpeg",
  "당신의 고급미에 치얼스": "/image/ysl.jpeg",
  "Back to 90's": "/image/jil_sander.jpeg",
  "차분한 블랙 & 화이트": "/image/prada.jpeg",
  "용기가 필요한 Girl": "/image/2.jpeg"
};


  // 3. 결과 화면 표시
  function showResult(finalItem) {
    setTimeout(() => {
      screenList.style.display = "none";
      screenResult.style.display = "block";

      // 선택된 아이템 텍스트
    const itemName = finalItem.textContent.trim();
    resultTitle.textContent = itemName;

    // 매핑 객체에서 이미지 경로 가져오기
    const imgPath = itemImageMap[itemName] || "/image/default.jpeg"; 
    resultImage.src = imgPath;
  }, 1000);
}



//3-1. 메뉴 버튼 클릭 시 메인 화면으로
  menuBtn.addEventListener("click", () => {
  screenResult.style.display = "none";
  screenMain.style.display = "block";

  // 결과 초기화
  resultTitle.textContent = "";
  resultImage.src = "";
  });
});
