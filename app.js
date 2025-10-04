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
      items.style.color = ""; 

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

 


  // 3. 결과 화면 표시
  function showResult(finalItem) {
    setTimeout(() => {
      screenList.style.display = "none";
      screenResult.style.display = "block";

      // 선택된 아이템 텍스트
    const itemName = finalItem.textContent.trim();
    resultTitle.textContent = itemName;

    // 매핑 객체에서 이미지 경로 가져오기
    const imgPath =  finalItem.dataset.img || "https://sakura0416710.github.io/mini-projects/image/default.png"; 
  
    // 캐시 방지용 쿼리스트링 추가
    resultImage.src = `${imgPath}?v=${new Date().getTime()}`;
  }, 1000);
}



//3-1. 메뉴 버튼 클릭 시 메인 화면으로
  menuBtn.addEventListener("click", () => {
  screenResult.style.display = "none";
  screenMain.style.display = "block";


  });
});
