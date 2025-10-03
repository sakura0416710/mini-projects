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
  "오늘의 커리어우먼은 바로 나": "https://sakura0416710.github.io/mini-projects/image/the_row2.png",
  "깔끔 러블리걸": "https://sakura0416710.github.io/mini-projects/image/the_row3.png",
  "올화이트룩": "https://sakura0416710.github.io/mini-projects/image/the_row.png",
  "말해뭐해 가을의 르메르": "https://sakura0416710.github.io/mini-projects/image/remaire2.png",
  "디테일의 신": "https://sakura0416710.github.io/mini-projects/image/remaire2.png",
  "도쿄 멋쟁이": "https://sakura0416710.github.io/mini-projects/image/nanamica.png",
  "쟤니?죄니": "https://sakura0416710.github.io/mini-projects/image/chanel.jpeg",
  "트위드로 종결": "https://sakura0416710.github.io/mini-projects/image/chanel2.png",
  "추위도 멋은 포기모태": "https://sakura0416710.github.io/mini-projects/image/vvw.png",
  "러블리의 인간화": "https://sakura0416710.github.io/mini-projects/image/shushu.png",
  "이 구역 깜찍큩걸": "https://sakura0416710.github.io/mini-projects/image/miumiu.png",
  "러블리 으른ver": "https://sakura0416710.github.io/mini-projects/image/shushu2.jpeg",
  "꾸안꾸 미우미우걸": "https://sakura0416710.github.io/mini-projects/image/miumiu2.png",
  "성수동 점령가능룩": "https://sakura0416710.github.io/mini-projects/image/bm.png",
  "퇴근하고 한남동으로 모여": "https://sakura0416710.github.io/mini-projects/image/balenciaga.png",
  "미우미우인간의 가을룩": "https://sakura0416710.github.io/mini-projects/image/miumiu3.png",
  "인스타 여신은 바로 나": "https://sakura0416710.github.io/mini-projects/image/bm2.png",
  "고어텍스 한 스푼": "https://sakura0416710.github.io/mini-projects/image/act2.png",
  "편하고 멋지고 다해버려": "https://sakura0416710.github.io/mini-projects/image/act1.png",
  "당신의 고급미에 치얼스": "https://sakura0416710.github.io/mini-projects/image/ysl.png",
  "Back to 90's": "https://sakura0416710.github.io/mini-projects/image/jil_sander.png",
  "차분한 블랙 & 화이트": "https://sakura0416710.github.io/mini-projects/image/prada.png",
  "용기가 필요한 Girl": "https://sakura0416710.github.io/mini-projects/image/prada2.jpeg"
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
    const imgPath = itemImageMap[itemName] || "https://sakura0416710.github.io/mini-projects/image/default.png"; 
    resultImage.src = imgPath;
  }, 1000);
}



//3-1. 메뉴 버튼 클릭 시 메인 화면으로
  menuBtn.addEventListener("click", () => {
  screenResult.style.display = "none";
  screenMain.style.display = "block";


  });
});
